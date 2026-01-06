import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useLanguage from '../../hooks/useLanguage';
import { Expression } from '../../LanguageTypes';



const StoryReader = () => {
  const location = useLocation();
  const { lesson, selectedLanguage } = location.state || {};
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState('false');
  const [speakingRate] = useState(1)
  const [voice] = useLanguage(selectedLanguage) // TODO: Clean up

  const read = (counter: number = 0) => {
    const speechUtterance = new SpeechSynthesisUtterance()

    // TODO: text highlighting type of idea but not fleshed out
    // speechUtterance.onboundary = function (event) {
    //     var e = document.getElementById('text-area');
    //     e.innerHTML = event.target.text; 
    // }

    speechUtterance.voice = voice as SpeechSynthesisVoice
    // TODO: ADD RATE SLIDER
    speechUtterance.rate = speakingRate
    speechUtterance.text = lesson.sentences[counter].target_language // HARDCODED
    window.speechSynthesis.speak(speechUtterance);

    if (lesson.sentences.length > counter + 1) {
      read(counter + 1)
    }

  }

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page in the history stack
  };

  function displaySentence(phrase: Expression) {
    if (phrase.grammar) {
      const regex = new RegExp(phrase.grammar.highlight)
      const highlightedText = phrase.target_language.replace(regex, match => `<span style="color: red;"}>${match}</span>`);

      return <div style={{ backgroundColor: "grey", borderRadius: '3' }}>
        <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
        <p>{phrase.base_language}</p>
      </div>
    } else {
      return <div style={{ backgroundColor: "grey", borderRadius: '3' }}>
        <p>{phrase.target_language}</p>
        <p>{phrase.base_language}</p>
      </div>
    }
  }


  return <>
    <button onClick={() => handleGoBack()} >go back</button >
    {/* TODO: disable until speaking is done */}
    <button onClick={() => read()} >speak</button >
    {
      lesson.sentences.map((sentence: Expression) => (
        <div onMouseEnter={() => setShowPopup(sentence.target_language)}
          onMouseLeave={() => setShowPopup('false')}
          style={{ position: 'relative' }}
        >
          {displaySentence(sentence)}

          {showPopup == sentence.target_language && (
            <div
              style={{
                position: 'absolute',
                top: '100%', // Position below the "Hover Me" text
                left: 0,
                backgroundColor: 'lightgray',
                color: 'black',
                padding: '10px',
                border: '1px solid gray',
                zIndex: 10, // Ensure it appears above other content
              }}
            >
              <div>{sentence.base_language}</div>
              {sentence.grammar?.note}
            </div>
          )}
        </div >
      ))
    }
    <br /><br /><br /><br />
    <div id="text-area" style={{ backgroundColor: 'white', color: 'black' }}></div>
  </>
}



export default StoryReader;
