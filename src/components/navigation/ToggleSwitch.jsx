import './ToggleSwitch.css'
import moonOutline from './asleep.svg'
import sunOutline from './light.svg'
import moonFilled from './asleep-filled.svg'
import sunFilled from './light-filled.svg'

const ToggleSwitch = ({ theme, onToggleTheme }) => {
    return (
        <div className="toggle-wrapper">
            <button
                className={`toggle-switch ${theme}`}
                onClick={onToggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
                <span className="toggle-circle"></span>

                <span className="icon-stack moon-stack">
                    <img src={moonOutline} alt="" className="icon-img outline" />
                    <img src={moonFilled} alt="" className="icon-img filled" />
                </span>

                <span className="icon-stack sun-stack">
                    <img src={sunOutline} alt="" className="icon-img outline" />
                    <img src={sunFilled} alt="" className="icon-img filled" />
                </span>
            </button>
        </div>
    );
}

export default ToggleSwitch;
