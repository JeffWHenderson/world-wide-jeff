import { useState } from "react";
import { translations } from "./Lessons/translations";

const FlashCards = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    const [cardNumber] = useState(0)
    const [showEnglish] = useState(true)
    const [speakingRate, setSpeakingRate] = useState(1)
    const [cardQueue, setCardQueue] = useState([...translations])


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

        message.rate = speakingRate
        message.voice = selectedVoice ? selectedVoice : voices[0]
        message.text = phrase;
        window.speechSynthesis.speak(message);
    }

    const nextCard = (newIndex: number) => {
        const copyOfQueue = [...cardQueue]
        let elementToMove = copyOfQueue.splice(cardNumber, 1)[0] // pop the current item off the queue
        copyOfQueue.splice(cardNumber + newIndex, 0, elementToMove); // insert the latest phrase back into queue at newIndex
        setCardQueue(copyOfQueue)

        if (selectedLanguage !== "None") {
            speak(cardQueue[cardNumber + 1][selectedLanguage], selectedLanguage)
        }
    }

    return <div style={{ height: '80vh', width: '100vw' }}>

        <div style={{ height: '70%', marginLeft: "10%" }}>
            {showEnglish ? <h3>{cardQueue[cardNumber]["English"]}</h3> : null}
            <div style={{ fontSize: '2em' }} onClick={() => speak(cardQueue[cardNumber][selectedLanguage], selectedLanguage)}>
                {selectedLanguage === "Arabic" ? <p style={{ color: 'red', height: "1.5em" }}>{cardQueue[cardNumber]["Arabic-English"]}</p> : null}
                {selectedLanguage === "Japanese" ? <p style={{ color: 'red', height: "1.5em" }}>{cardQueue[cardNumber]["Romanji"]}</p> : null}
                {selectedLanguage === "Chinese" ? <p style={{ color: 'red', height: "1.5em" }}>{cardQueue[cardNumber]["Chinese-Pinyin"]}</p> : null}
                <p>{cardQueue[cardNumber][selectedLanguage]}</p>
            </div>
        </div >

        <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="Japanese">Japanese</option>
            <option value="Arabic">Arabic</option>
            <option value="English">English</option>
        </select>
        <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between', margin: '10px' }}>
            <button onClick={() => setSpeakingRate(speakingRate + .1)}>speedup</button>
            <button onClick={() => setSpeakingRate(speakingRate - .1)}>slowdown</button>
        </div>
        <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between', margin: '10px' }}>
            <button style={{ backgroundColor: 'red', color: 'black', width: '25%' }} onClick={() => nextCard(8)}>unfamiliar</button>
            <button style={{ backgroundColor: 'yellow', color: 'black', width: '25%' }} onClick={() => nextCard(15)}>famiar</button>
            <button style={{ backgroundColor: 'green', color: 'black', width: '25%' }} onClick={() => nextCard(cardQueue.length - 1)}>Know it</button>
        </div>
    </div>
}

export default FlashCards;

