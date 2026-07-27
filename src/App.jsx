import { useState, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';
import ParticlesBg from 'particles-bg'
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import './App.css'

//Magic constants
const DEBOUNCE_DELAY = 500;
const CONFIDENCE_THRESHOLD = 0.9;
const PERSON_LABEL = 'person';

function App() {
  const [theme, setTheme] = useState('dark');
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, DEBOUNCE_DELAY); //debounced value of input

  const [detections, setDetections] = useState([]);
  const [displayDetections, setDisplayDetections] = useState(false)
  const [detectClicked, setDetectClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_HF_TOKEN;
  //const corsFreeTestImgLink = "https://huggingface.co/datasets/mishig/sample_images/resolve/main/football-match.jpg"
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  useEffect(() => {
    if(!debouncedInput) return;

    setDetections([]);  //clearning old detections immediately
    setDisplayDetections(false);  // clearing/hiding old boxes
    setDetectClicked(false);

    const fetchDetections = async() => {
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
        setDetections(highConfidenceItems.filter(items => items.label === PERSON_LABEL)); //filters only "person" label

      } catch (error) {
        console.error("Error detecting faces:", error);
        setError(error.message);  // setting error message
        setDetections([]);  // clearing detections on error   

      } finally {
        setLoading(false);
      }
    };
    
    fetchDetections();

  }, [debouncedInput, token]);


  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const onInputChange = (value) => {
    setInput(value);
    setDetectClicked(false);
    setDisplayDetections(false);
  };

  const onDetectButtonClick = () => {
    setDetectClicked(true);
    setDisplayDetections(true);
  };
  
  return (
    <>
      <ParticlesBg
        color="#5d15b0"
        type="cobweb"
        bg={true}
        num={80}
      />
      <Navigation theme={theme} onToggleTheme={toggleTheme}/>
      <Logo theme={theme}/>
      <Rank />
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

export default App
