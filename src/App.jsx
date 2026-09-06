import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { Navigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg'


import Navigation from './components/navigation/Navigation';
// import SignIn from './components/SingIn/SignIn';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import './App.css'

//Magic constants
const DEBOUNCE_DELAY = 100;
const CONFIDENCE_THRESHOLD = 0.85;
const PERSON_LABEL = 'person';

function App({ theme, toggleTheme, user, updateUserEntries, logoutUser}) {
  
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, DEBOUNCE_DELAY); //debounced value of input

  const [detections, setDetections] = useState([]);
  const [displayDetections, setDisplayDetections] = useState(false);
  const [detectClicked, setDetectClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = import.meta.env.VITE_HF_TOKEN;
  //const corsFreeTestImgLink = "https://huggingface.co/datasets/mishig/sample_images/resolve/main/football-match.jpg"


    
    const onUpdateEntries = useCallback(async (detectionCount) => {
    try {
        const response = await fetch("http://localhost:3000/image", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                entries: detectionCount,
                image_url: input
            })
        });
        
        const data = await response.json();
        
        // Check if response was successful
        if (!response.ok) {
            setError(data);  // Show backend error message
            return;
        }
        
        // Success - update user entries
        setError(null);  // Clear any previous errors
        updateUserEntries(data);
        
    } catch (error) {
        console.error("Error updating entries:", error);
        setError(error.message);
    }
  
  }, [updateUserEntries, input]);


  useEffect(() => {
    if(!debouncedInput) return;

    let isStale = false; //flagging for this specific effect run

    const fetchDetections = async() => {
      setDetections([]);  //clearning old detections immediately
      setDisplayDetections(false);  // clearing/hiding old boxes
      setDetectClicked(false);
      setLoading(true);
      setError(null); //clearning previous errors

      try{
        const imgResponse = await fetch(debouncedInput);
        const imgBlob = await imgResponse.blob();
        //console.log(imgBlob);
        const apiResponse = await fetch("https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: imgBlob,
        });
  
        const results = await apiResponse.json();
        let highConfidenceItems = results.filter(results => results.score >= CONFIDENCE_THRESHOLD);
        const detectedPersons = highConfidenceItems.filter(items => items.label === PERSON_LABEL);
        setDetections(detectedPersons);

      } catch (error) {
        if(!isStale) {
          console.error("Error detecting faces:", error);
          setError(error.message);  // setting error message
          setDetections([]);  // clearing detections on error   
        }

      } finally {
        if(!isStale) setLoading(false);
      }
    };
    
    fetchDetections();
    

    return () => {
      isStale = true; // marking this specific runs results as irrelevant
    };

  }, [debouncedInput, token]);


  const onInputChange = (value) => {
    setInput(value);
    setDetectClicked(false);
    setDisplayDetections(false);
  };

  const onDetectButtonClick = () => {
    setDetectClicked(true);
    setDisplayDetections(true);
    if (detections.length > 0) {
      onUpdateEntries(detections.length);
    }
  };

  if (!user) {
        return <Navigate to="/signin" />;  // Redirect if not logged in
  } else {
    return (
      <>
        <ParticlesBg color="#5d15b0" type="cobweb" bg={true} num={80} />
        <Navigation theme={theme} onToggleTheme={toggleTheme} logoutUser={logoutUser}/>
        <Logo theme={theme}/>
        <Rank user={user} detections={detections}/>
        {error && (
          <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </div>
        )}
        <ImageLinkForm onInputChange={onInputChange} onClick={onDetectButtonClick}/>
        <FaceRecognition imageUrl={input} detections={detections} displayDetections={displayDetections} detectClicked={detectClicked} loading={loading}/>
      </>
  )
  }
  
  
}

export default App
