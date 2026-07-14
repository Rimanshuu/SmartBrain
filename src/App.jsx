import { useState, useEffect } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <ParticlesBg
        color="#5d15b0"
        type="cobweb"
        bg={true}
        num={80}
      />
      <Navigation theme={theme} onToggleTheme={toggleTheme}/>
      <Logo theme={theme}/>
      <Rank />
      <ImageLinkForm theme={theme}/>
    {/* <FaceRecognition />*/}
    </>
  )
}

export default App
