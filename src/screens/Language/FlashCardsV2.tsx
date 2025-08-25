import { useEffect, useState } from "react";
import { lessons } from "./LessonList";
import useLanguage from "./hooks/useLanguage";
import { useLocation } from "react-router-dom";

const FlashCardsV2 = () => {
    const { state } = useLocation();
    console.log(state)
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    const [cardNumber, setCardNumber] = useState(0)
    const [speakingRate, setSpeakingRate] = useState(1)
    const [cardQueue, setCardQueue] = useState<any[]>([...lessons[0].wordList])
    const [autoplay, setAutoPlay] = useState(false)
    const [voice] = useLanguage(selectedLanguage)
    const [englishVoice] = useLanguage("English")
    const [readFront, setReadFront] = useState(true)
    const [readBack, setReadBack] = useState(true)

    // play after card number is updated
    useEffect(() => {
        if (readFront && readBack) {
            read(true) // do in english
            setTimeout(() => read(), 2000)
        } else {
            if (readFront) {
                read(true)
            }
            if (readBack) {
                read()
            }
        }
        if (autoplay) {
            setTimeout(nextCard, 3700)
        }
    }, [cardNumber, autoplay])

    const nextCard = (indexChange: number = 1) => {
        setCardNumber(cardNumber + indexChange)
    }

    const read = (isEnglish: boolean = false) => {
        const speechUtterance = new SpeechSynthesisUtterance()
        window.speechSynthesis.cancel()
        speechUtterance.voice = isEnglish ? englishVoice as SpeechSynthesisVoice : voice as SpeechSynthesisVoice
        speechUtterance.rate = speakingRate
        speechUtterance.text = cardQueue[cardNumber][isEnglish ? "English" : selectedLanguage];
        window.speechSynthesis.speak(speechUtterance);
    }

    return <div style={{ height: '82%', margin: '0% 3% 0% 3%', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', width: '100%' }}>
            <select id="cars-back-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
            </select>
            <select id="lesson-select" onChange={(e) => {
                setCardQueue([...lessons[Number.parseInt(e.target.value)].wordList])
                setCardNumber(0)
            }
            }>
                {lessons.map((lesson, i) => (
                    <option value={i}>{lesson.lessonName}</option>
                ))}
            </select>
            <label>
                <input
                    type="checkbox"
                    checked={autoplay}
                    onChange={() => setAutoPlay(!autoplay)}
                />
                Autoplay
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={readFront}
                    onChange={() => setReadFront(!readFront)}
                />
                Read Front
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={readBack}
                    onChange={() => setReadBack(!readBack)}
                />
                Read Back
            </label>
        </div>
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

