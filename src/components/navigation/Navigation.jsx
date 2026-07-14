import React from "react";
import './Navigation.css'
import ToggleSwitch from './ToggleSwitch'

const Navigation = ({ theme, onToggleTheme }) => {
    return (
        <nav className="navbar">
            <ToggleSwitch theme={theme} onToggleTheme={onToggleTheme} />
            <p className='f3 link dim underline pad3 pointer nav-text'>Sign Out</p>
        </nav>
    );
}

export default Navigation;