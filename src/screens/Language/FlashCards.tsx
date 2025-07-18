import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    let [cardNumber, setCardNumber] = useState(0)
    const [showEnglish] = useState(true)
    const [startingIndex, setStartingIndex] = useState(0)
    const [stopIndex] = useState(translations.length)

    // const [autoplay] = useState(true)

    // useEffect(() => {
    //   window.addEventListener("keydown", onKeyDown); // Add event listener for keydown event
    //   //return () => {
    //     //window.removeEventListener("keydown", onKeyDown); // Remove event listener on component unmount
    //   //};
    // const intervalId = setInterval(() => {
    //         cardNumber++;
    //         nextCard()
    //     }, 4000);
    //     return () => clearInterval(intervalId);

    // }, [autoplay]);

    // const onKeyDown = (e: any) => {

    //     if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    //         console.log("space-bar")
    //         nextCard();
    //     }
    // }

    function shiftIndex() {
        setCardNumber(startingIndex + 50);
        setStartingIndex(startingIndex + 50);
    }


    function speak(phrase: string, lang: string) {
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
        window.speechSynthesis.speak(message);
    }

    const nextCard = () => {
        if (cardNumber >= stopIndex) {
            setCardNumber(startingIndex)
        } else {
            setCardNumber(cardNumber + 1)
        }
        if (selectedLanguage !== "None") {
            speak(translations[cardNumber + 1][selectedLanguage], selectedLanguage)
        }
    }

    return <div style={{ height: '80vh', width: '100vw' }}>

        <div style={{ height: '70%', marginLeft: "10%" }}>
            {showEnglish ? <h3>{cardNumber}: {translations[cardNumber]["English"]}</h3> : null}
            <div style={{ fontSize: '2em' }} onClick={() => speak(translations[cardNumber][selectedLanguage], selectedLanguage)}>
                {selectedLanguage === "Arabic" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Arabic-English"]}</p> : null}
                {selectedLanguage === "Japanese" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Romanji"]}</p> : null}
                {selectedLanguage === "Chinese" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Chinese-Pinyin"]}</p> : null}
                <p>{translations[cardNumber][selectedLanguage]}</p>
            </div>
        </div >

        <div style={{ height: '10%', width: '100%' }}>
            <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
            </select>

        </div>
        <div style={{ display: 'flex', height: '10%', width: '100%', justifyContent: 'space-between' }}>
            <button style={{ width: '35%', marginLeft: '8px' }} onClick={shiftIndex}>Shift Start (+50)</button>
            <button style={{ width: '55%', marginRight: '8px' }} onClick={() => nextCard()}>next</button>
        </div>
    </div>
}

export default FlashCards;

