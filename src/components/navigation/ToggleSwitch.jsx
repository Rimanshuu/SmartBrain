import React from "react";
import './ToggleSwitch.css'
import moonOutline from './asleep.svg'
import sunOutline from './light.svg'
import moonFilled from './asleep-filled.svg'
import sunFilled from './light-filled.svg'

const ToggleSwitch = ({ theme, onToggleTheme }) => {
    return (
        <div className="toggle-wrapper">
            <div
                className={`toggle-switch ${theme}`}
                onClick={onToggleTheme}
            >
                <div className="toggle-circle"></div>

                <div className="icon-stack moon-stack">
                    <img src={moonOutline} alt="moon outline" className="icon-img outline" />
                    <img src={moonFilled} alt="moon filled" className="icon-img filled" />
                </div>

                <div className="icon-stack sun-stack">
                    <img src={sunOutline} alt="sun outline" className="icon-img outline" />
                    <img src={sunFilled} alt="sun filled" className="icon-img filled" />
                </div>
            </div>
        </div>
    );
}

export default ToggleSwitch;
