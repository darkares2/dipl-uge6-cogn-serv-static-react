import React, { useState } from "react";
import validator from 'validator'
import spinner from './spinner.jpg';

const App = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setDisabled] = useState(true);
  const [isWaiting, setWaiting] = useState(false);
  const [data, setData] = useState('');
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');


  const validate = (value) => {
    setUrl(value);
    if (validator.isURL(value)) {
      setErrorMessage('')
      setDisabled(false);
    } else {
      setErrorMessage('Is Not Valid URL')
      setDisabled(true);
    }
  }

  const analyzeImage = () => {
    (async function () {
      setDisabled(true);
      setWaiting(true);
      var text = null;
      await fetch(`/api/AnalyzeImage?url=` + url)
                .then(response => { 
                  console.log("Response: ", response);
                  if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                  }
                  return response.json(); 
                } )
                .then(json => { text = json; } )
                .catch(error => { console.log("Error: ", error); });
      setWaiting(false);
      setDisabled(false);
      console.log('Text: ', text);
      if (text !== null) {
        setData(text.message);
        const categories = text.categories;
        categories.sort((a, b) => b.score - a.score);
        setCategory(categories.map(cat => `${cat.name} (${cat.score.toFixed(2)})`).join(', '));
        const captions = text.captions;
        captions.sort((a, b) => b.confidence - a.confidence);
        setCaption(captions.map(cap => `${cap.text} (${cap.confidence.toFixed(2)})`).join(', '));
      }
    })();
  };

  
  return (<div>
    <h2>Enter image url to analyze</h2>
    { isWaiting ? <img src={spinner} style={{ width: '340px', margin: 'auto', display: 'block' }} alt="Loading..." /> :
      <div>
        <span>Enter URL: </span><input type="text" onChange={(e) => validate(e.target.value)} value={url}></input> <br />
        <div>
          Examples:
          <button onClick={(e) => validate('https://picsum.photos/id/237/200/300')}>Dog</button>
          <button onClick={(e) => validate('https://picsum.photos/id/200/200/300')}>Cow</button>
          <button onClick={(e) => validate('https://picsum.photos/id/309/200/300')}>Leaf</button>
        </div>
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
      </div>
      }
    
    <img src={url} alt="Content to be analyzed by cognitive computer vision" />
  </div>);
}

export default App;
