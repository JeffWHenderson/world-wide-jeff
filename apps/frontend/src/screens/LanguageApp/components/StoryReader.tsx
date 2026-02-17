import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { Expression } from '../LanguageTypes';


const StoryReader = () => {
  const { language, lessonId, section } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState('false');
  const [speakingRate] = useState(1)
  const [voice] = useLanguage(language as string)
  const [lesson, setLesson] = useState<any>(null)
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch(`/${language}/modules/${section}/stories/${lessonId}`)
      .then(res => res.json())
      .then(data => { console.log(data); setLesson(data) })
      .catch(err => console.error(err))
  }, [])

  const playOrPause = (startPosition: number) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause
    } else {
      read(startPosition)
    }
  }


  const read = (index: number, playAll: boolean = true) => {
    const speechUtterance = new SpeechSynthesisUtterance()
    speechUtterance.voice = voice as SpeechSynthesisVoice
    speechUtterance.rate = speakingRate
    const newIndex = index + 1

    speechUtterance.text = lesson.sentences[index].target_language
    speechUtterance.onend = () => {
      if (playAll) {
        setTimeout(() => read(newIndex), 500) // MAKE DELAY VARIABLE
      } else {
        setCounter(newIndex)
      }
      if (newIndex === lesson.sentence.length - 1) {
        setCounter(0)
        speechSynthesis.cancel
      }
    }

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


  return <div className='story-container'>
    <div className='story-page'>
      {
        lesson &&
        lesson.sentences.map((sentence: Expression) => (
          <div
            onMouseEnter={() => setShowPopup(sentence.target_language)}
            onMouseLeave={() => setShowPopup('false')}
            style={{ position: 'relative' }}
            onClick={() => {
              setShowPopup(sentence.target_language)
            }
            }
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
      <div className="fixed-element">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className='back-button' onClick={() => handleGoBack()} >go back</button>
          <button className='next-button' onClick={() => playOrPause(counter)}>{'play all'}</button>
        </div>
      </div>
    </div>
  </div>
}



export default StoryReader;
