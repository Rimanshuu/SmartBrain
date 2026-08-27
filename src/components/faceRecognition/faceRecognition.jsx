import { useState, useRef } from "react";
import './faceRecognition.css';

const FaceRecognition = ({imageUrl, detections, displayDetections, detectClicked, loading}) => {

    const imgRef = useRef(null);
    const [ scale, setScale ] = useState({x: 1, y: 1});

    const handleImageLoad = () => {
        // console.log("displayed width:", imgRef.current.clientWidth);
        // console.log("displayed height:", imgRef.current.clientHeight);
        // console.log("natural width:", imgRef.current.naturalWidth);
        // console.log("natural height:", imgRef.current.naturalHeight);
        const scaleX = imgRef.current.clientWidth / imgRef.current.naturalWidth;
        const scaleY = imgRef.current.clientHeight / imgRef.current.naturalHeight;

        setScale({
        x: scaleX,
        y: scaleY,
        });

        
    }

    return (
        <div className='imageDisplayBox ma4'>
            { //only render when imageUrl is NOT empty
                imageUrl && (<div className="image-container" style={{ position: 'relative', display: 'inline-block' }}>
                
                {/* Loading overlay */}
                {detectClicked && loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
                
                {/* Image */}
                <img 
                    ref={imgRef} 
                    src={imageUrl} 
                    alt="image" 
                    onLoad={handleImageLoad}  
                    width='500px'  
                    height='auto'
                    style={{ filter: (detectClicked && loading) ? 'blur(5px)' : 'blur(0px)' }} 
                />
                
                {/* Bounding boxes */}
                {displayDetections && detections.map((detection, i) => (
                    <div
                    key={i}
                    className="bounding-box"
                    style={{
                        position: "absolute",
                        left: detection.box.xmin * scale.x,
                        top: detection.box.ymin * scale.y,
                        width: (detection.box.xmax - detection.box.xmin) * scale.x,
                        height: (detection.box.ymax - detection.box.ymin) * scale.y,
                    }}
                    ></div>
                ))}
                
            </div>
            )}
        </div>
        
    )
}

export default FaceRecognition;