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

  useEffect(() => {
    if (lesson) {
      read()
    }
  }, [counter])


  const read = () => {
    const speechUtterance = new SpeechSynthesisUtterance()
    speechUtterance.voice = voice as SpeechSynthesisVoice
    speechUtterance.rate = speakingRate
    speechUtterance.text = lesson.sentences[counter].target_language // HARDCODED
    window.speechSynthesis.speak(speechUtterance);

    if (lesson.sentences.length > counter + 1) {
      setCounter(counter + 1)
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
      return <div>
        <p>{phrase.target_language}</p>
      </div>
    }
  }


  return <>
    <button onClick={() => handleGoBack()} >go back</button>
    {/* TODO: disable until speaking is done */}
    <button onClick={() => read()} >speak</button>
    {
      lesson &&
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
        </div>
      ))
    }
    <br /><br /><br /><br />
    <div id="text-area" style={{ backgroundColor: 'white', color: 'black' }}></div>
  </>
}



export default StoryReader;
