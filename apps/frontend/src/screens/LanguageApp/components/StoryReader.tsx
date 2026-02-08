import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { Expression } from '../LanguageTypes';


const StoryReader = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState('false');
  const [speakingRate] = useState(1)
  const [voice] = useLanguage(language as string)
  const [lesson, setLesson] = useState<any>(null)
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch(`/${language}/modules/${lessonId?.split("_")[0]}/stories/${lessonId}`)
      .then(res => res.json())
      .then(data => { console.log(data); setLesson(data) })
      .catch(err => console.error(err))
  }, [])

  const playOrPause = (startPosition: number) => {
    // Disable button on play
    const speechUtterance = new SpeechSynthesisUtterance()
    speechUtterance.voice = voice as SpeechSynthesisVoice
    speechUtterance.rate = speakingRate

    // If is playing ()
    // pause speech synthesis 
    // if is paused
    read(speechUtterance, startPosition)
    // 
  }


  const read = (speechUtterance: SpeechSynthesisUtterance, index: number) => {
    const newIndex = index + 1

    speechUtterance.text = lesson.sentences[index].target_language
    speechUtterance.onend = () => setTimeout(() => read(speechUtterance, newIndex), 500) // MAKE DELAY VARIABLE
    setCounter(newIndex)
    window.speechSynthesis.speak(speechUtterance);
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
      return <div>
        <p>{phrase.target_language}</p>
      </div>
    }
  }


  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ backgroundColor: "white", padding: '7px', width: '100vw', maxWidth: '900px' }}>
      {
        lesson &&
        lesson.sentences.map((sentence: Expression, index: number) => (
          <div
            onMouseEnter={() => setShowPopup(sentence.target_language)}
            onMouseLeave={() => setShowPopup('false')}
            style={{ position: 'relative' }}
            onClick={() => playOrPause(index)}
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
          </div>
        ))
      }
      <br /><br /><br /><br />
      <div id="text-area" style={{ backgroundColor: 'white', color: 'black' }}></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => handleGoBack()} >go back</button>
        <button onClick={() => playOrPause(counter)} >speak</button>
      </div>
    </div>
  </div>
}



export default StoryReader;
