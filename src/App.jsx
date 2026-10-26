import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { Navigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg'
import { isValidUrl } from './utils/isValidUrl';
import { isExampleImage } from './exampleImages';


import Navigation from './components/navigation/Navigation';
// import SignIn from './components/SingIn/SignIn';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import HelpModal from './components/helpModal/HelpModal';
import ConfirmDialog from './components/confirmDialog/ConfirmDialog';
import './App.css'

//Magic constants
const DEBOUNCE_DELAY = 100;
const HELP_SEEN_KEY = 'smartbrain-help-seen';

// storage can be blocked (private mode etc), so never let it break the page
const hasSeenHelp = () => {
  try {
    return localStorage.getItem(HELP_SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

function App({ theme, toggleTheme, user, updateUserEntries, logoutUser}) {
  
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, DEBOUNCE_DELAY); //debounced value of input

  const [detections, setDetections] = useState([]);
  const [displayDetections, setDisplayDetections] = useState(false);
  const [detectClicked, setDetectClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null); // neutral info, not an error
  // open automatically only the first time, for users who haven't counted anything yet
  const [showHelp, setShowHelp] = useState(() => Number(user?.entries) === 0 && !hasSeenHelp());
  const closeHelp = useCallback(() => {
    setShowHelp(false);
    try {
      localStorage.setItem(HELP_SEEN_KEY, '1');
    } catch {
      // storage blocked - help may just open again next visit
    }
  }, []);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);
  const closeResetConfirm = useCallback(() => {
    if (!resetting) setShowResetConfirm(false); // don't close mid-request
  }, [resetting]);
  const detectClickedRef = useRef(false); // tracks if user clicked detect while detection was still loading
  const detectionCache = useRef(new Map()); // image url -> detections, so revisiting an image doesn't call the API again
  const pendingDetections = useRef(new Map()); // image url -> in-flight request, so switching back mid-load reuses it
  const countedUrls = useRef(new Set()); // images already added to the user's total this session



    const onUpdateEntries = useCallback(async (imageUrl, detectionCount) => {
    // nothing to add, demo photo, or already counted - skip the request entirely
    if (detectionCount === 0 || isExampleImage(imageUrl) || countedUrls.current.has(imageUrl)) return;
    countedUrls.current.add(imageUrl);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                entries: detectionCount,
                image_url: imageUrl
            })
        });

        const data = await response.json();

        // Check if response was successful
        if (!response.ok) {
            // backend won't count the same image twice in 24h - that's expected, not an error
            if (response.status === 400 && String(data).includes('already counted')) {
                setNotice("You've already counted this photo today, so it wasn't added again.");
                return;
            }
            countedUrls.current.delete(imageUrl); // allow a retry
            setError(data);  // Show backend error message
            return;
        }

        // Success - update user entries
        setError(null);  // Clear any previous errors
        updateUserEntries(data);

    } catch (error) {
        countedUrls.current.delete(imageUrl);
        console.error("Error updating entries:", error);
        setError(error.message);
    }

  }, [updateUserEntries]);


  // set the user's count back to 0 (backend also forgets which images were counted)
  const onResetCount = async () => {
    setResetting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/image/reset`, {
        method: 'PUT',
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      countedUrls.current.clear(); // every photo can be counted again
      setError(null);
      setNotice(null);
      updateUserEntries(data);
    } catch (error) {
      console.error("Error resetting count:", error);
      setError(error.message);
    } finally {
      setResetting(false);
      setShowResetConfirm(false);
    }
  };


  // call backend /detect endpoint instead of hitting HF directly
  // backend handles image fetching + HF API call + filtering all in one place
  const requestDetections = async (imageUrl) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/detect`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ image_url: imageUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const persons = await response.json();
      detectionCache.current.set(imageUrl, persons); // only successful results are cached
      return persons;
    } finally {
      pendingDetections.current.delete(imageUrl); // done either way, failures can be retried
    }
  };


  useEffect(() => {
    if(!isValidUrl(debouncedInput)) return; // skip empty or half-typed input

    let isStale = false; //flagging for this specific effect run

    // if user clicked detect (or an example) before results were ready, show them + count now
    const showResultIfClicked = (persons) => {
      if (detectClickedRef.current) {
        setDisplayDetections(true);
        onUpdateEntries(debouncedInput, persons.length);
        detectClickedRef.current = false;
      }
    };

    const fetchDetections = async() => {
      setDisplayDetections(false);
      setError(null);
      // detectClicked is reset in onInputChange, not here, so a click made
      // before the debounce fires (or an example click) isn't lost

      // already detected this image before, reuse the result instead of calling the API
      const cached = detectionCache.current.get(debouncedInput);
      if (cached) {
        setDetections(cached);
        setLoading(false);
        showResultIfClicked(cached);
        return;
      }

      setDetections([]);
      setLoading(true);

      let detectedPersonsTemp = [];

      try{
        // reuse a request that's already running for this image instead of starting another
        let request = pendingDetections.current.get(debouncedInput);
        if (!request) {
          request = requestDetections(debouncedInput);
          pendingDetections.current.set(debouncedInput, request);
        }

        detectedPersonsTemp = await request;
        if (!isStale) setDetections(detectedPersonsTemp);

      } catch (error) {
        if(!isStale) {
          console.error("Error detecting objects:", error);
          setError(error.message);
          setDetections([]);
        }

      } finally {
        if(!isStale) {
          setLoading(false);
          showResultIfClicked(detectedPersonsTemp);
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
    setError(null); // old errors belong to the old link
    setNotice(null);
    detectClickedRef.current = false;
  };

  const onDetectButtonClick = () => {
    if (!isValidUrl(input)) return; // form already shows a hint for bad links

    detectClickedRef.current = true;
    setDetectClicked(true);

    // still loading, or the debounce hasn't started detection for this input yet
    // the effect's finally block will handle showing boxes + incrementing when done
    if (loading || debouncedInput !== input) {
      return;
    }

    // detection already done, show boxes and increment count right away
    setDisplayDetections(true);
    onUpdateEntries(input, detections.length);
  };

  // example thumbnails fill the input and detect straight away
  const onExampleClick = (url) => {
    if (url === input) {
      onDetectButtonClick(); // same image again, nothing new to fetch
      return;
    }
    onInputChange(url);
    detectClickedRef.current = true;
    setDetectClicked(true);
  };

  // only show "found N people" once detection finished without errors
  const showResult = displayDetections && !loading && !error;

  if (!user) {
        return <Navigate to="/signin" />;  // Redirect if not logged in
  } else {
    return (
      <>
        {/* particles only read their colour on mount, so remount when the theme changes */}
        <ParticlesBg key={theme} color={theme === 'light' ? '#7e22ce' : '#5d15b0'} type="cobweb" bg={true} num={40} />
        <Navigation
          theme={theme}
          onToggleTheme={toggleTheme}
          user={user}
          logoutUser={logoutUser}
          onHelpClick={() => setShowHelp(true)}
          onResetClick={() => setShowResetConfirm(true)}
        />

        <main className="app-main">
          <ImageLinkForm input={input} onInputChange={onInputChange} onClick={onDetectButtonClick} loading={loading}/>
          {error && (
            <p className="message message-error" role="alert">{error}</p>
          )}
          {notice && !error && (
            <p className="message message-notice">{notice}</p>
          )}
          <FaceRecognition imageUrl={isValidUrl(input) ? input : ''} detections={detections} displayDetections={displayDetections} detectClicked={detectClicked} loading={loading} showResult={showResult} isDemo={isExampleImage(input)}/>
        </main>

        {showHelp && (
          <HelpModal
            onClose={closeHelp}
            onExampleClick={(url) => { closeHelp(); onExampleClick(url); }}
          />
        )}
        {showResetConfirm && (
          <ConfirmDialog
            title="Reset your count?"
            message={`This sets your total of ${user.entries} back to 0. Photos you've already counted can be counted again. This can't be undone.`}
            confirmLabel="Reset count"
            onConfirm={onResetCount}
            onCancel={closeResetConfirm}
            busy={resetting}
          />
        )}
      </>
  )
  }
  
  
}

export default App
