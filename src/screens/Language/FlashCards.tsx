import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [displayLanguage, setDisplayLanguage] = useState("Spanish")
    const [displayCharacters, setDisplayCharacters] = useState<string | null>(null)
    const [voiceIndex, setVoiceIndex] = useState(8)
    let voices = speechSynthesis.getVoices();


    function speak() {
        const message = new SpeechSynthesisUtterance();
        message.text = translations[0][displayLanguage];
        message.volume = 1; // Volume range = 0 - 1
        message.rate = 1.1; // Speed of the text read , default 1
        message.voice = voices[voiceIndex]; // change voice
        message.lang = 'en-GB'; // Language, default 'en-US'
        window.speechSynthesis.speak(message);
        console.log(voices)
    }

    const handleChangeDisplayLang = () => {
        if (displayLanguage == "Spanish") {
            setVoiceIndex(25)
            setDisplayLanguage("Chinese")
            setDisplayCharacters("ChinesePinyin")
        }
        if (displayLanguage == "Chinese") {
            setVoiceIndex(18)
            setDisplayCharacters("Romanji")
            setDisplayLanguage("Japanese")
        }
        if (displayLanguage == "Japanese") {
            setVoiceIndex(23)
            setDisplayCharacters("Arabic-English")
            setDisplayLanguage("arabic")
        }
        if (displayLanguage == "arabic") {
            setVoiceIndex(0)
            setDisplayCharacters(null)
            setDisplayLanguage("English")
        }
        if (displayLanguage == "English") {
            setVoiceIndex(8)
            setDisplayLanguage("Spanish")
        }
    }

    return <>
        <button onClick={() => speak()}>speak</button>
        <button onClick={handleChangeDisplayLang}>changeLang</button>
        <div>
            {
                translations.map(phrase => (
                    <div key={phrase["English"]} style={{ height: "3em" }}>
                        <div style={{ height: "1.5em" }}>{phrase[displayLanguage]}</div>
                        {displayCharacters ? <div style={{ color: 'red', height: "1.5em" }}>{phrase[displayCharacters]}</div> : null}
                    </div>
                ))
            }
        </div>
    </>
}

export default FlashCards;

