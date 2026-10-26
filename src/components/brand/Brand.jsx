import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Brand.css';

// each part is split into letters so they can animate in one after another
const WORD_PARTS = [
    { text: 'Smart', className: 'brand-word-smart' },
    { text: 'Brain', className: 'brand-word-brain' },
];

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
                {WORD_PARTS.map(part => (
                    <span key={part.text} className={`brand-word ${part.className}`} aria-hidden="true">
                        {[...part.text].map(letter => (
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
