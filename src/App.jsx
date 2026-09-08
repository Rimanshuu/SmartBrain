import { useState, useEffect, useCallback, useRef } from 'react';
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

function App({ theme, toggleTheme, user, updateUserEntries, logoutUser}) {
  
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, DEBOUNCE_DELAY); //debounced value of input

  const [detections, setDetections] = useState([]);
  const [displayDetections, setDisplayDetections] = useState(false);
  const [detectClicked, setDetectClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const detectClickedRef = useRef(false); // tracks if user clicked detect while detection was still loading


    
    const onUpdateEntries = useCallback(async (detectionCount) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
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
      setDetections([]);
      setDisplayDetections(false);
      setDetectClicked(false);
      detectClickedRef.current = false;
      setLoading(true);
      setError(null);

      let detectedPersonsTemp = [];

      try{
        // call backend /detect endpoint instead of hitting HF directly
        // backend handles image fetching + HF API call + filtering all in one place
        const response = await fetch(`${import.meta.env.VITE_API_URL}/detect`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({ image_url: debouncedInput })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }

        detectedPersonsTemp = await response.json();
        setDetections(detectedPersonsTemp);

      } catch (error) {
        if(!isStale) {
          console.error("Error detecting objects:", error);
          setError(error.message);
          setDetections([]);
        }

      } finally {
        if(!isStale) {
          setLoading(false);
          // if user clicked button while loading, now shows boxes and increment
          if (detectClickedRef.current && detectedPersonsTemp.length > 0) {
            setDisplayDetections(true);
            onUpdateEntries(detectedPersonsTemp.length);
            detectClickedRef.current = false;
          }
        }
      }
    };
    
    fetchDetections();
    

    return () => {
      isStale = true; // marking this specific runs results as irrelevant
    };

  }, [debouncedInput]); // only re-render when debounced input changes, even if 'onUpdateEntries' is one of the dependencies (ignore linting warning)


  const onInputChange = (value) => {
    setInput(value);
    setDetectClicked(false);
    setDisplayDetections(false);
  };

  const onDetectButtonClick = () => {
    detectClickedRef.current = true;
    setDetectClicked(true);

    if (loading) {
      // detection still loading in background, just mark that user clicked
      // the effect's finally block will handle showing boxes + incrementing when done
      return;
    }

    // detection already done, show boxes and increment count right away
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
        <ImageLinkForm onInputChange={onInputChange} onClick={onDetectButtonClick} loading={loading}/>
        <FaceRecognition imageUrl={input} detections={detections} displayDetections={displayDetections} detectClicked={detectClicked} loading={loading}/>
      </>
  )
  }
  
  
}

export default App
