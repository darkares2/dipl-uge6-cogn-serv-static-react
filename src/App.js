import React, { useState, useEffect } from "react";
import validator from 'validator'
  
const App = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setDisabled] = useState(true);
  const [data, setData] = useState('');
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
          Result: {data}
        </span>
  </div>);
}

export default App;
