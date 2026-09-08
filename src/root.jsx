import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx';
import SignIn from './components/SingIn/SignIn.jsx';
import Register from './components/Register/Register.jsx';


function Root() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // In root.jsx useEffect
    useEffect(() => {
      // The httpOnly cookie (not localStorage) is the real source of truth for
      // whether we're logged in, so always ask the backend on mount.
      fetch(`${import.meta.env.VITE_API_URL}/profile`, { credentials: 'include' })
        .then(res => {
          if (!res.ok) throw new Error('not authenticated');
          return res.json();
        })
        .then(data => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(() => {
          // no valid cookie (never logged in, or it expired) - clear any stale cache
          setUser(null);
          localStorage.removeItem('user');
        });
    }, []);  // Run only on mount

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  const loadUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); //saving to locaStorage
  }

  const updateUserEntries = (newEntries) => {
    setUser(prev => { 
      const updated = {...prev, entries: newEntries };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
     });
  };

  const logoutUser = () => {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, { method: 'POST', credentials: 'include' })
      .finally(() => {
        setUser(null);
        localStorage.removeItem('user');
      });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <App 
            theme={theme} 
            toggleTheme={toggleTheme} user={user} 
            loadUser={loadUser} 
            updateUserEntries={updateUserEntries} 
            logoutUser={logoutUser} />}/>
        <Route path="signin" element={
          <SignIn 
            theme={theme} 
            loadUser={loadUser} 
            user={user} />}/>
        <Route path="register" element={
          <Register 
            heme={theme}  
            loadUser={loadUser} 
            user={user} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Root