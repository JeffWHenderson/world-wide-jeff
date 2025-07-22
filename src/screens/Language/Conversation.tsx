import { useState } from "react";
import './language.css';

const lessonOneDTO = {
    lessonName: "Introductions",
    lessonNotes: "this lesson is to help you with your first conversation",
    Spanish: [
        "hola",
        "hello",
        "adios"
    ],
    English: [
        "hi",
        "what's up",
        "goodbye"
    ]
}

const container = { display: "flex", width: '100%', height: '10vh', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'end' }
const redSquare = { width: '30px', height: '30px', backgroundColor: 'red' }
const blueCircle = { width: '30px', height: '30px', backgroundColor: 'blue', borderRadius: '30px' }

const Conversation = () => {
    const [index, setIndex] = useState(0)
    const [isLeftPanel, setIsLeftPanel] = useState(true)
    const [lang, setLang] = useState("Spanish")
    const [vocabList, setVocabList] = useState(lessonOneDTO.Spanish)

    function speak(phrase: string) {
        window.speechSynthesis.cancel()
        let voices = speechSynthesis.getVoices();
        const message = new SpeechSynthesisUtterance();

        let selectedVoice: any = voices[0]

        if (lang == "Spanish") {
            selectedVoice = voices.find((voice) => {
                return voice.name.toLowerCase() == "paulina"
            });
        }
        if (lang == "Chinese") {
            let found = voices.find((voice) => {
                return voice.name.toLowerCase() == "ting-ting" || voice.name.toLowerCase() == "tingting"
            });
            selectedVoice = found
        }
        if (lang == "Japanese") {
            selectedVoice = voices.find((voice) => {
                return voice.name.toLocaleLowerCase() == "kyoko"
            });
        }
        if (lang == "Arabic") {
            selectedVoice = voices.find((voice) => {
                return voice.lang == "ar-SA"
            });
        }
        if (lang == "English") {
            selectedVoice = voices.find(i => i.name.toLowerCase() == "samantha")
        }

        message.voice = selectedVoice ? selectedVoice : voices[0]
        message.text = phrase;
        // console.log(selectedVoice);
        window.speechSynthesis.speak(message);
        // message.volume = 1; // Volume range = 0 - 1
        // message.rate = 1.1; // Speed of the text read , default 1
        // message.lang = 'en-GB'; // Language, default 'en-US'
    }


    const handleClick = () => {
        if (index <= vocabList.length) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }

        if (index % 2 == 0) {
            setIsLeftPanel(!isLeftPanel)
        };

        speak(vocabList[0])

        // if (autoPlayLanguage !== "None") {
        //     speak(translations[cardNumber + 1][autoPlayLanguage], autoPlayLanguage)
        // }
    }


    return <>
        <div onClick={() => handleClick()} style={{ backgroundColor: 'white', padding: '10px' }}>
            {isLeftPanel ? <div className="speech-bubble-left">{vocabList[0]}</div> : null}
            {!isLeftPanel ? <div className="speech-bubble-right">{vocabList[1]}</div> : null}
            <div style={container}>
                <div style={{ margin: '10px' }}>
                    <div style={redSquare}></div>
                </div>

                <div style={{ margin: '10px', justifySelf: 'right' }}>
                    <div style={blueCircle}></div>
                </div>
            </div>
        </div >
    </>
}

export default Conversation;