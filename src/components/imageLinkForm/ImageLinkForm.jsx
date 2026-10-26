import { isValidUrl } from '../../utils/isValidUrl';
import './ImageLinkForm.css'

const ImageLinkForm = ({ input, onInputChange, onClick }) => {
    const showInvalidHint = input.trim() !== '' && !isValidUrl(input);

    return (
        <div className="image-form-container">
            <div className="form-intro">
                <h1 className="form-title">Find the people in any photo</h1>
                <p className='f3 center form-subtitle'>
                    Paste a link to an image and we'll draw a box around almost every person in it.
                </p>
            </div>
            <div className="center form-wrapper">
                <div className="form center">
                    <div className="form-inputs">
                        <input
                            className='f4 form-input'
                            type="text"
                            placeholder="Paste image URL here..."
                            value={input}
                            onChange={(event) => onInputChange(event.target.value)}
                        />
                        <button
                            className='btn-primary'
                            onClick={onClick}
                        >
                            Detect
                        </button>
                    </div>

                    {showInvalidHint && (
                        <p className="form-hint form-hint-warning">
                            That doesn't look like a link. It should start with https://
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
