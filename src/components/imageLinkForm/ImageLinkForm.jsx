import { isValidUrl } from '../../utils/isValidUrl';
import './ImageLinkForm.css'

const ImageLinkForm = ({ input, onInputChange, onClick }) => {
    const showInvalidHint = input.trim() !== '' && !isValidUrl(input);

    const onSubmit = (event) => {
        event.preventDefault(); // Enter key detects instead of reloading the page
        onClick();
    };

    return (
        <section className="hero">
            <h1 className="hero-title">Find the people in any photo</h1>
            <p className="hero-subtitle">
                Paste a link to an image and we'll draw a box around almost every person in it.
            </p>

            <form className="detect-form" onSubmit={onSubmit}>
                <input
                    className="detect-input"
                    type="text"
                    placeholder="Paste image URL here..."
                    aria-label="Image URL"
                    value={input}
                    onChange={(event) => onInputChange(event.target.value)}
                />
                <button type="submit" className="btn-primary detect-button">
                    Detect
                </button>
            </form>

            {showInvalidHint && (
                <p className="message message-warning">
                    That doesn't look like a link. It should start with https://
                </p>
            )}
        </section>
    );
}

export default ImageLinkForm;
