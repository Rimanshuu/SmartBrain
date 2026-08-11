import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'tachyons';
import './main.css';
import Root from './root.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
