import './Navigation.css'
import ToggleSwitch from './ToggleSwitch'
import Brand from '../brand/Brand';
import UserMenu from '../userMenu/UserMenu';

const Navigation = ({ theme, onToggleTheme, user, logoutUser, onHelpClick, onResetClick }) => {

    return (
        <nav className="navbar">
            <Brand />
            <div className="nav-actions">
                <button className="nav-pill help-button" onClick={onHelpClick} aria-label="How it works">
                    <span className="help-button-icon" aria-hidden="true">?</span>
                    <span className="help-button-text">How it works</span>
                </button>
                <ToggleSwitch theme={theme} onToggleTheme={onToggleTheme} />
                <UserMenu user={user} onResetClick={onResetClick} onSignOut={logoutUser} />
            </div>
        </nav>
    );
}

export default Navigation;
