import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onClick }) => {
    return (
        <div className="image-form-container">
            <p className='f3 center form-subtitle'>
                Detect faces in your pictures. Give it a try!
            </p>
            <div className="center form-wrapper">
                <div className="form center">
                    <div className="form-inputs">
                        <input
                            className='f4 form-input'
                            type="text"
                            placeholder="Paste image URL here..."
                            onChange={(event) => {
                                const value = event.target.value;
                                if (value.trim()) onInputChange(value); //update when not empty
                            }}
                        />
                        <button
                            className='btn-primary'
                            onClick={onClick}
                        >
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;