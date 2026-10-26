import { useState, useRef, useEffect } from "react";
import './faceRecognition.css';

const FaceRecognition = ({imageUrl, detections, displayDetections, detectClicked, loading, showResult, isDemo}) => {

    const containerRef = useRef(null);
    // the image's real pixel size - detection boxes come back in these units
    const [ naturalSize, setNaturalSize ] = useState({width: 1, height: 1});
    const [ failedUrl, setFailedUrl ] = useState(null); // last url the browser couldn't load as an image
    const imageFailed = imageUrl && failedUrl === imageUrl;

    const personCount = detections.length;
    const resultMessage = personCount > 0
        ? `Found ${personCount} ${personCount === 1 ? 'person' : 'people'}`
        : 'No people found. Try a photo with people in it.';

    const handleImageLoad = (event) => {
        setNaturalSize({
            width: event.target.naturalWidth,
            height: event.target.naturalHeight,
        });
    }

    // boxes are placed in % of the image, so they stay aligned at any display size
    const toPercent = (value, total) => `${(value / total) * 100}%`;

    // bring the result into view once it's ready, so nobody has to scroll to find it
    useEffect(() => {
        if (showResult) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [showResult]);

    return (
        <div className='imageDisplayBox ma4' ref={containerRef}>
            {imageFailed && (
                <p className="result-message result-message-warning">
                    Couldn't load an image from this link. Make sure it's a direct image address
                    (opening it in a new tab should show only the image).
                </p>
            )}

            {showResult && !imageFailed && (
                <p className="result-message">
                    {resultMessage}
                    {isDemo && <span className="result-note">Demo photo, not added to your total</span>}
                </p>
            )}

            { //only render when imageUrl is NOT empty
                imageUrl && !imageFailed && (<div className="image-container">
                
                {/* Loading overlay */}
                {detectClicked && loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
                
                {/* Image */}
                <img
                    className="detected-image"
                    src={imageUrl}
                    alt="image"
                    onLoad={handleImageLoad}
                    onError={() => setFailedUrl(imageUrl)}
                    style={{ filter: (detectClicked && loading) ? 'blur(5px)' : 'blur(0px)' }}
                />

                {/* Bounding boxes */}
                {displayDetections && detections.map((detection, i) => (
                    <div
                    key={i}
                    className="bounding-box"
                    style={{
                        position: "absolute",
                        left: toPercent(detection.box.xmin, naturalSize.width),
                        top: toPercent(detection.box.ymin, naturalSize.height),
                        width: toPercent(detection.box.xmax - detection.box.xmin, naturalSize.width),
                        height: toPercent(detection.box.ymax - detection.box.ymin, naturalSize.height),
                    }}
                    ></div>
                ))}
                
            </div>
            )}
        </div>
        
    )
}

export default FaceRecognition;