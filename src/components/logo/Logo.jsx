import React from "react";
import brain from "./brain.png"
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = ({ theme }) => {
    return (
        <>
            <div className="logo-container ma4 mt0">     
                <Tilt className="logo-tilt">
                    <div className="logo-box br3 pa2 shadow-5 flex items-center justify-center">
                        <img
                            src={brain}
                            alt="logo"
                            className={`logo-image ${theme}`}
                        />
                    </div>
                </Tilt>
            </div>
        </>  
    );
}

export default Logo;