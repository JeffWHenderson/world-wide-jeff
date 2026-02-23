import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { Expression } from '../LanguageTypes';

const HighlightedText = ({ text, from, to }: any) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <p>
      {start}
      <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
      {finish}
    </p>
  );
};

const splitText = (text: string, from: number, to: number) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to)
];


const StoryReader = () => {
  const { language, lessonId, section } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState('false');
  const [speakingRate] = useState(1)
  const [voice] = useLanguage(language as string)
  const [lesson, setLesson] = useState<any>(null)
  const [counter, setCounter] = useState(0);
  const [highlightSection, setHighlightSection] = useState({
    from: 0,
    to: 0
  });

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
    setShowPopup(lesson.sentences[index].target_language)
    const speechUtterance = new SpeechSynthesisUtterance()
    speechUtterance.voice = voice as SpeechSynthesisVoice
    speechUtterance.rate = speakingRate
    const newIndex = index + 1

    speechUtterance.text = lesson.sentences[index].target_language

    // ADD HIGHLIGHTING
    speechUtterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });

    speechUtterance.onend = () => {
      if (playAll) {
        setCounter(newIndex)
        setHighlightSection({ from: 0, to: 0 })
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
    speechSynthesis.cancel();
    navigate(-1); // Navigates to the previous page in the history stack
  };


  return <div className='story-container'>
    {lesson && <h2>{lesson.name}</h2>}
    <div className='story-page'>
      {
        lesson &&
        lesson.sentences.map((sentence: Expression, index: number) => (
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              if (showPopup !== sentence.target_language) {
                setShowPopup(sentence.target_language)
              } else {
                setShowPopup('false')
              }
            }}
          >
            {showPopup == sentence.target_language && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '110%', // Position below the "Hover Me" text
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
            {counter === index ?
              <div style={{ textDecoration: "underline" }}><HighlightedText text={sentence.target_language} {...highlightSection} /></div>
              : <p>{sentence.target_language}</p>
            }

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
  </div >
}



export default StoryReader;
