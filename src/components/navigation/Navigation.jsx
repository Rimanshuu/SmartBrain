import './Navigation.css'
import ToggleSwitch from './ToggleSwitch'
import { Link } from "react-router-dom";

const Navigation = ({ theme, onToggleTheme, logoutUser }) => {

    
    return (
        <nav className="navbar">
            <ToggleSwitch theme={theme} onToggleTheme={onToggleTheme} />
            <Link to="/register" onClick={logoutUser} className='f3 link dim pad3 pointer nav-text'>Sign Out</Link>
            
        </nav>
    );
}

export default Navigation;