import React, { useState } from "react";
import validator from 'validator'
  
const App = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setDisabled] = useState(true);

  const validate = (value) => {
    
    if (validator.isURL(value)) {
      setErrorMessage('Is Valid URL')
      setDisabled(false);
    } else {
      setErrorMessage('Is Not Valid URL')
      setDisabled(true);
    }
  }

  const analyzeImage = () => {
    
  }
  
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
  </div>);
}

export default App;
