import { useEffect } from 'react';
import './Modal.css';

// shared dialog shell: dark overlay, centered card, close button, Escape to close
const Modal = ({ onClose, labelledBy, children }) => {

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* stop clicks inside the card from closing it */}
            <div
                className="modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                onClick={(event) => event.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
