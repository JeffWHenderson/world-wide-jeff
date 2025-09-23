import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useLanguage from '../../hooks/useLanguage';

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
    const [voice] = useLanguage("Spanish") // TODO: Voice Selector


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
        speechUtterance.text = lesson.sentences[counter].targetLanguage // HARDCODED
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
            const highlightedText = phrase.targetLanguage.replace(regex, match => `<span style="color: red;"}>${match}</span>`);

            return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
        } else {
            return <div>{phrase.targetLanguage}</div>
        }
    }


    return <>
        <button onClick={() => handleGoBack()} >go back</button >
        {/* TODO: disable until speaking is done */}
        <button onClick={() => read()} >speak</button >
        {
            lesson.sentences.map(sentence => (
                <div onMouseEnter={() => setShowPopup(sentence.targetLanguage)}
                    onMouseLeave={() => setShowPopup('false')}
                    style={{ position: 'relative' }}
                >
                    {displaySentence(sentence)}

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
                </div >
            ))
        }
        <br /><br /><br /><br />
        <div id="text-area" style={{ backgroundColor: 'white', color: 'black' }}></div>
    </>
}



export default StoryReader;