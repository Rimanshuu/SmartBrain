import './Navigation.css'
import ToggleSwitch from './ToggleSwitch'
import { Link } from "react-router-dom";

const Navigation = ({ theme, onToggleTheme, logoutUser, onHelpClick }) => {


    return (
        <nav className="navbar">
            <button className="help-button" onClick={onHelpClick}>
                <span className="help-button-icon" aria-hidden="true">?</span>
                <span className="help-button-text">How it works</span>
            </button>
            <ToggleSwitch theme={theme} onToggleTheme={onToggleTheme} />
            <Link to="/signin" onClick={logoutUser} className='f3 link dim pad3 pointer nav-text'>Sign Out</Link>
            
        </nav>
    );
}

export default Navigation;