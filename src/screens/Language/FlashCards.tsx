import { useState, useEffect } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [languages] = useState(["Spanish", "Chinese", "Japanese", "arabic"])
    const [cardNumber, setCardNumber] = useState(0)
    const [showEnglish] = useState(true)
    const [autoPlayLanguage, setAutoPlayLanguage] = useState("None")

    let voices = speechSynthesis.getVoices();
    console.log(voices);
    /*
    useEffect(() => {
      window.addEventListener("keydown", onKeyDown); // Add event listener for keydown event
      //return () => {
        //window.removeEventListener("keydown", onKeyDown); // Remove event listener on component unmount
      //};
    }, []);

    const onKeyDown = (e: any) => {

      if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
         console.log("space-bar")
         nextCard();
      }
    }
    */


    function speak(phrase: string, lang: string) {
        const message = new SpeechSynthesisUtterance();
        message.text = phrase;

        if (lang == "Spanish") {
            message.voice = voices[8]
        }
        if (lang == "Chinese") {
            message.voice = voices[25]
        }
        if (lang == "Japanese") {
            message.voice = voices[18]
        }
        if (lang == "arabic") {
            message.voice = voices[23]
        }
        if (lang == "English") {
            message.voice = voices[0]
        }

        window.speechSynthesis.speak(message);
        // message.volume = 1; // Volume range = 0 - 1
        // message.rate = 1.1; // Speed of the text read , default 1
        // message.lang = 'en-GB'; // Language, default 'en-US'
    }

    const nextCard = () => {
        setCardNumber(cardNumber + 1)
        if (autoPlayLanguage !== "None") {
            speak(translations[cardNumber + 1][autoPlayLanguage], autoPlayLanguage)
        }
    }

    return <>
        <label>
            auto play language
            <select id="auto-play-select" onChange={(e) => setAutoPlayLanguage(e.target.value)}>
                <option value="none" onSe>None</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="arabic">Arabic</option>
                <option value="English">English</option>
            </select>
        </label>
        {/* <div style={{ marginBottom: "5px" }}>
            <label for="english">
                <input type="checkbox" id="english"></input>
                English
            </label>
            <label for="arabic">
                <input type="checkbox" id="arabic"></input>
                Arabic
            </label>
            <label for="chinese">
                <input type="checkbox" id="chinese"></input>
                Chinese
            </label>
            <label for="japanese">
                <input type="checkbox" id="japanese"></input>
                Japanese
            </label>
            <label for="spanish">
                <input type="checkbox" id="spanish"></input>
                Spanish
            </label>
        </div> */}

        {showEnglish ? <h3 style={{ marginLeft: "10px" }}>{translations[cardNumber]["English"]}</h3> : null}

        {languages.map((lang) => (
            <div style={{ border: "1px solid grey", borderRadius: "4px", margin: "3px" }} onClick={() => speak(translations[cardNumber][lang], lang)}>
                {lang === "arabic" ? <div style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Arabic-English"]}</div> : null}
                {lang === "Japanese" ? <div style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Romanji"]}</div> : null}
                {lang === "Chinese" ? <div style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["ChinesePinyin"]}</div> : null}
                {translations[cardNumber][lang]}
            </div>
        ))}
        <button onClick={() => nextCard()}>next</button>
    </>
}

export default FlashCards;

