import React, { useState } from "react";
import validator from 'validator'
  
const App = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setDisabled] = useState(true);
  const [data, setData] = useState('');
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState({});


  const validate = (value) => {
    
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')
      setDisabled(false);
      setUrl(value);
    } else {
      setErrorMessage('Is Not Valid URL')
      setDisabled(true);
      setUrl('');
    }
  }

  const analyzeImage = () => {
    (async function () {
      const text = await( await fetch(`/api/AnalyzeImage?url=` + url)).json();
      console.log('Text: ', text);
      setData(text.message);
      const categories = text.categories;
      categories.sort((a, b) => b.score - a.score);
      setCategory(categories.map(cat => `${cat.name} (${cat.score.toFixed(2)})`).join(', '));
      const captions = text.captions;
      captions.sort((a, b) => b.confidence - a.confidence);
      setCaption(captions.map(cap => `${cap.text} (${cap.confidence.toFixed(2)})`).join(', '));
    })();
  };

  
  return (<div>
    <h2>Enter image url to analyze</h2>
        <span>Enter URL: </span><input type="text" 
        onChange={(e) => validate(e.target.value)}></input> <br />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
        <br />
        <button onClick={analyzeImage} disabled={isDisabled}>
          Analyze image!
        </button>
        <span>
          Result: {data} <br />
          Category: {category} <br />
          Caption: {caption} <br />
        </span>
        <img src={url} alt="Content to be analyzed by cognitive computer vision" />
  </div>);
}

export default App;
