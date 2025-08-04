import { useEffect, useState } from "react";
import { translations } from "./Lessons/translations";

const FlashCardsV2 = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    const [cardNumber, setCardNumber] = useState(0)
    const [speakingRate, setSpeakingRate] = useState(1)
    const [cardQueue] = useState([...translations])
    const [autoplay, setAutoPlay] = useState(false)
    const [speechUtterance] = useState(new SpeechSynthesisUtterance())

    let voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

    // has to wait on the inital page load from the browser then set the default voice
    useEffect(() => {
        const waitForBrowser = () => {
            let initialVoices = speechSynthesis.getVoices()

            // @ts-ignore
            speechUtterance.voice = initialVoices.find((voice) => {
                return voice.lang.toLowerCase().includes("zh-")
            });
        }

        setTimeout(waitForBrowser, 1000)
    }, [])

    // change voice when selected
    useEffect(() => {
        let selectedVoice: any = voices[0]
        if (selectedLanguage == "Spanish") {
            selectedVoice = voices.find((voice) => {
                return voice.lang.toLowerCase().includes("es-mx")
            });
        }
        if (selectedLanguage == "Chinese") {
            let found = voices.find((voice) => {
                return voice.lang.toLowerCase().includes("zh-")
            });

            selectedVoice = found
        }
        if (selectedLanguage == "Japanese") {
            selectedVoice = voices.find((voice) => {
                return voice.lang.toLowerCase().includes("ja-")
            });
        }
        if (selectedLanguage == "Arabic") {
            selectedVoice = voices.find((voice) => {
                return voice.lang == "ar-SA"
            });
        }
        if (selectedLanguage == "English") {
            selectedVoice = voices.find(i => i.name.toLowerCase() == "samantha")
        }

        speechUtterance.voice = selectedVoice
    }, [selectedLanguage])


    // play after card number is updated
    useEffect(() => {
        window.speechSynthesis.cancel()
        speechUtterance.rate = speakingRate
        speechUtterance.text = cardQueue[cardNumber][selectedLanguage];
        window.speechSynthesis.speak(speechUtterance);
        if (autoplay) {
            setTimeout(nextCard, 2500)
        }
    }, [cardNumber, autoplay])

    const nextCard = (indexChange: number = 1) => {
        setCardNumber(cardNumber + indexChange)
    }

    return <div style={{ height: '82%', margin: '0% 3% 0% 3%', justifyContent: 'center' }}>
        <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="Japanese">Japanese</option>
            <option value="Arabic">Arabic</option>
            <option value="English">English</option>
        </select>
        <label>
            <input
                type="checkbox"
                checked={autoplay}
                onChange={() => setAutoPlay(!autoplay)}
            />
            Autoplay
        </label>
        <div style={{ height: '70%', justifyContent: 'center' }}>
            <div>
                <div style={{ width: '100%' }}>
                    {cardQueue[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                    <p>{cardQueue[cardNumber]["English"]}</p>
                </div>
                <div style={{ fontSize: '2em' }}>
                    <div style={{ borderBottom: "1px solid grey" }}></div>
                    {selectedLanguage === "Arabic" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Arabic-English"]}</p> : null}
                    {selectedLanguage === "Japanese" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Romanji"]}</p> : null}
                    {selectedLanguage === "Chinese" ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{cardQueue[cardNumber]["Chinese-Pinyin"]}</p> : null}
                    <div>{cardQueue[cardNumber][selectedLanguage]}</div>
                </div>

            </div>
        </div >

        <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between', marginBottom: '10px' }}>
            <button onClick={() => setSpeakingRate(speakingRate + .1)}>speedup</button>
            <button onClick={() => setSpeakingRate(speakingRate - .1)}>slowdown</button>
        </div>
        <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between' }}>
            <button style={{ backgroundColor: 'red', color: 'black', width: '25%' }} onClick={() => nextCard(-1)}>back</button>
            <button style={{ backgroundColor: 'green', color: 'black', width: '25%' }} onClick={() => nextCard()}>Next</button>
        </div>

    </div >

}

export default FlashCardsV2;

