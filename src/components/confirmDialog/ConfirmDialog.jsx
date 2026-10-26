import Modal from '../modal/Modal';
import './ConfirmDialog.css';

// asks "are you sure?" before a destructive action
const ConfirmDialog = ({ title, message, confirmLabel, onConfirm, onCancel, busy }) => {
    return (
        <Modal onClose={onCancel} labelledBy="confirm-title">
            <h2 id="confirm-title" className="modal-title confirm-title">{title}</h2>
            <p className="confirm-message">{message}</p>
            <div className="confirm-actions">
                <button className="confirm-cancel" onClick={onCancel} disabled={busy}>
                    Cancel
                </button>
                <button className="confirm-danger" onClick={onConfirm} disabled={busy}>
                    {busy ? 'Working...' : confirmLabel}
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;
