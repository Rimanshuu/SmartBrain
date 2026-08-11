import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx';
import SignIn from './components/SingIn/SignIn.jsx';
import Register from './components/Register/Register.jsx';


function Root() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App theme={theme} toggleTheme={toggleTheme} />}/>
        <Route path="signin" element={<SignIn theme={theme} />}/>
        <Route path="register" element={<Register theme={theme} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Root