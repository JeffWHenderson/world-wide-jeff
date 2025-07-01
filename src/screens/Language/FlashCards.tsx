import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [displayLanguage, setDisplayLanguage] = useState("Spanish")
    const [displayCharacters, setDisplayCharacters] = useState<string | null>(null)
    const [voiceIndex, setVoiceIndex] = useState(8)
    const [cardNumber, setCardNumber] = useState(0)
    const [showEnglish, setShowEnglish] = useState(false)
    let voices = speechSynthesis.getVoices();


    function speak(phrase: string) {
        const message = new SpeechSynthesisUtterance();
        message.text = phrase;
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

    const nextCard = () => {
        setCardNumber(cardNumber + 1)
        speak(translations[cardNumber + 1][displayLanguage])
    }

    return <>
        <button onClick={handleChangeDisplayLang}>changeLang</button>
        <button onClick={() => nextCard()}>next</button>
        <button onClick={() => setShowEnglish(!showEnglish)}>show English</button>
        <div onClick={() => speak(translations[cardNumber][displayLanguage])}>
            {displayCharacters ? <div style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber][displayCharacters]}</div> : null}
            {translations[cardNumber][displayLanguage]}
            {showEnglish ? <p>{translations[cardNumber]["English"]}</p> : null}
        </div>
    </>
}

export default FlashCards;

