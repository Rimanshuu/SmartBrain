import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Brand.css';

// each word is split into letters so they can animate in one after another
const WORDS = ['Smart', 'Brain'];

// the animated logo + name, used in the nav and on the auth pages
const Brand = ({ compact = false }) => {
    let letterIndex = 0;

    return (
        <div className={`brand ${compact ? 'brand-compact' : ''}`}>
            <Tilt className="brand-tilt">
                <div className="brand-mark">
                    <img src={brain} alt="SmartBrain logo" className="brand-image" />
                </div>
            </Tilt>
            <span className="brand-name" aria-label="SmartBrain">
                {WORDS.map(word => (
                    <span key={word} className="brand-word" aria-hidden="true">
                        {[...word].map(letter => (
                            <span
                                key={letterIndex}
                                className="brand-letter"
                                style={{ '--i': letterIndex++ }}
                            >
                                {letter}
                            </span>
                        ))}
                    </span>
                ))}
            </span>
        </div>
    );
}

export default Brand;
