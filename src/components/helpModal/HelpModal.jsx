import Modal from '../modal/Modal';
import { EXAMPLE_IMAGES } from '../../exampleImages';
import './HelpModal.css';

const STEPS = [
    { title: 'Find a photo', text: 'Right-click any image online and choose "Copy image address".' },
    { title: 'Paste and detect', text: 'Paste the link into the box and press Detect.' },
    { title: 'See the results', text: 'We draw a box around each person and add them to your total. Each photo counts once a day.' },
];

const HelpModal = ({ onClose, onExampleClick }) => {

    return (
        <Modal onClose={onClose} labelledBy="help-title">
            <h2 id="help-title" className="modal-title">How SmartBrain works</h2>

            <ol className="help-steps">
                {STEPS.map((step, i) => (
                    <li key={step.title} className="help-step">
                        <span className="help-step-number">{i + 1}</span>
                        <div>
                            <p className="help-step-title">{step.title}</p>
                            <p className="help-step-text">{step.text}</p>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="help-demo">
                <p className="help-demo-title">No link handy? Try a demo photo</p>
                <p className="help-demo-text">Demo photos don't count toward your total.</p>
                <div className="help-demo-list">
                    {EXAMPLE_IMAGES.map(example => (
                        <button
                            key={example.url}
                            className="help-demo-thumb"
                            onClick={() => onExampleClick(example.url)}
                            title={example.label}
                        >
                            <img src={example.url.replace('w=800', 'w=200')} alt={example.label} />
                        </button>
                    ))}
                </div>
            </div>

            <button className="btn-primary help-done" onClick={onClose}>Got it</button>
        </Modal>
    );
}

export default HelpModal;
