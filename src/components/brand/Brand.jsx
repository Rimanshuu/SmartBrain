import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Brand.css';

// the animated logo + name, used in the nav and on the auth pages
const Brand = ({ compact = false }) => {
    return (
        <div className={`brand ${compact ? 'brand-compact' : ''}`}>
            <Tilt className="brand-tilt">
                <div className="brand-mark">
                    <img src={brain} alt="SmartBrain logo" className="brand-image" />
                </div>
            </Tilt>
            <span className="brand-name">SmartBrain</span>
        </div>
    );
}

export default Brand;
