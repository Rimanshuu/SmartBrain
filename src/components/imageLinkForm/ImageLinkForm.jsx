import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ theme }) => {
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
                        />
                        <button className='f5 form-button'>Detect</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;