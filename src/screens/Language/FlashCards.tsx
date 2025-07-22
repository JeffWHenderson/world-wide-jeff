import { useState } from "react";
import { translations } from "./Lessons/translations";

const FlashCards = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    const [cardNumber] = useState(0)
    const [speakingRate, setSpeakingRate] = useState(1)
    const [cardQueue, setCardQueue] = useState([...translations])
    const [showBack, setShowBack] = useState(false)
    let voices = speechSynthesis.getVoices();

    function speak(phrase: string, lang: string) {
        window.speechSynthesis.cancel()
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
        message.voice = selectedVoice
        message.text = phrase;
        if (selectedVoice) {
            window.speechSynthesis.speak(message);
        }
    }

    const flipCard = () => {
        setShowBack(!showBack)
        speak(cardQueue[cardNumber][selectedLanguage], selectedLanguage)
    }

    const nextCard = (newIndex: number) => {
        setShowBack(false)
        const copyOfQueue = [...cardQueue]
        let elementToMove = copyOfQueue.splice(cardNumber, 1)[0] // pop the current item off the queue
        copyOfQueue.splice(cardNumber + newIndex, 0, elementToMove); // insert the latest phrase back into queue at newIndex
        setCardQueue(copyOfQueue)
    }

    return <div style={{ height: '82%', margin: '0% 3% 0% 3%', justifyContent: 'center' }}>
        <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="Japanese">Japanese</option>
            <option value="Arabic">Arabic</option>
            <option value="English">English</option>
        </select>
        <div style={{ height: '70%', justifyContent: 'center' }}>
            <div>
                <div style={{ width: '100%' }}>
                    {cardQueue[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                    <p>{cardQueue[cardNumber]["English"]}</p>
                </div>
                {showBack ?
                    <div style={{ fontSize: '2em' }} onClick={() => speak(cardQueue[cardNumber][selectedLanguage], selectedLanguage)}>
                        <div style={{ borderBottom: "1px solid grey" }}></div>
                        {selectedLanguage === "Arabic" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Arabic-English"]}</p> : null}
                        {selectedLanguage === "Japanese" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Romanji"]}</p> : null}
                        {selectedLanguage === "Chinese" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Chinese-Pinyin"]}</p> : null}
                        <div>{cardQueue[cardNumber][selectedLanguage]}</div>
                    </div>
                    : null}
            </div>
        </div >

        <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between', marginBottom: '10px' }}>
            <button onClick={() => setSpeakingRate(speakingRate + .1)}>speedup</button>
            <button onClick={() => setSpeakingRate(speakingRate - .1)}>slowdown</button>
        </div>
        {
            showBack ?
                <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between' }}>
                    <button style={{ backgroundColor: 'red', color: 'black', width: '25%' }} onClick={() => nextCard(6)}>unfamiliar</button>
                    <button style={{ backgroundColor: 'yellow', color: 'black', width: '25%' }} onClick={() => nextCard(12)}>famiar</button>
                    <button style={{ backgroundColor: 'green', color: 'black', width: '25%' }} onClick={() => nextCard(cardQueue.length - 1)}>Know it</button>
                </div>
                :
                <div style={{ display: 'flex', height: '10%', justifyContent: 'center', backgroundColor: "orange", justifyItems: 'center' }}
                    onClick={() => flipCard()}
                >
                    <p>Reveal</p>
                </div>
        }
    </div>

}

export default FlashCards;

