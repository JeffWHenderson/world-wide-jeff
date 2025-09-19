import { useNavigate } from 'react-router-dom';
import "./StoreReader.css"
import { useState } from 'react';
import useLanguage from '../../FlashCards/hooks/useLanguage';

type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    grammar?: any  // TODO: type
}

type Lesson = {
    sentences: Expression[]
}

const lesson: Lesson = {
    sentences: [
        {
            targetLanguage: "Hola todo el mundo.",
            baseLanguage: "Hello World.",
            grammar: {
                highlight: "todo el mundo",
                note: "literal: all the world"
            }
        },
        {
            targetLanguage: "Bienbenidos a mi applicacion",
            baseLanguage: "welcome to my app",
            grammar: {
                highlight: "applicacion",
                note: "inflection on the i"
            }
        },
        {
            targetLanguage: "soy un enginero",
            baseLanguage: "I'm an engineer",
            grammar: null
        },
    ]
}


const StoryReader = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState('false');
    const [speakingRate] = useState(1)
    const [voice] = useLanguage("Spanish")
    // const [englishVoice] = useLanguage("English")

    const read = (counter: number = 0) => {
        const speechUtterance = new SpeechSynthesisUtterance()
        // speechUtterance.voice = isEnglish ? englishVoice as SpeechSynthesisVoice : voice as SpeechSynthesisVoice
        speechUtterance.voice = voice as SpeechSynthesisVoice
        speechUtterance.rate = speakingRate // ADD SLIDER
        speechUtterance.text = lesson.sentences[counter].targetLanguage // HARDCODED
        window.speechSynthesis.speak(speechUtterance);
        read(counter + 1)

    }

    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page in the history stack
    };

    function displaySentence(phrase: Expression) {
        if (phrase.grammar) {
            const regex = new RegExp(phrase.grammar.highlight)
            const highlightedText = phrase.targetLanguage.replace(regex, match => `<span style="color: red;"}>${match}</span>`);

            return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
        } else {
            return <div>{phrase.targetLanguage}</div>
        }
    }


    return <>
        <button onClick={() => handleGoBack()} >go back</button >
        <button onClick={() => read()} >speak</button >
        {
            lesson.sentences.map(sentence => (
                <div onMouseEnter={() => setShowPopup(sentence.targetLanguage)}
                    onMouseLeave={() => setShowPopup('false')}
                    style={{ position: 'relative' }}
                >
                    <div style={{ display: 'flex' }}>
                        <div>{displaySentence(sentence)}</div>
                    </div>

                    {showPopup == sentence.targetLanguage && (
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
                            <div>{sentence.baseLanguage}</div>
                            {sentence.grammar?.note}
                        </div>
                    )}
                </div>
            ))
        }
    </>
}



export default StoryReader