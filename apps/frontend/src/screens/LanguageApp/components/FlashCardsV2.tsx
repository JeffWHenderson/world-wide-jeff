import { useEffect, useState } from "react";
import useLanguage from "../hooks/useLanguage";
import { useParams } from "react-router-dom";
import "./flashcards.css"

const FlashCardsV2 = () => {
    const { language, lessonId } = useParams();
    const [lesson, setLesson] = useState<any>(null)
    const [cardNumber, setCardNumber] = useState(0)
    const [speakingRate, setSpeakingRate] = useState(1)
    const [autoplay, setAutoPlay] = useState(false)
    const [voice] = useLanguage(language as string)
    const [englishVoice] = useLanguage("english")
    const [readFront, setReadFront] = useState(true)
    const [readBack, setReadBack] = useState(true)

    useEffect(() => {
        fetch(`/${language?.toLowerCase()}/modules/${lessonId?.split("_")[0]}/${lessonId}`)
            .then(res => res.json())
            .then(data => { console.log(data); setLesson(data) })
            .catch(err => console.error(err))
    }, [])

    // // play after card number is updated
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
        if (lesson.sentences.length - 1 > cardNumber) {
            setCardNumber(cardNumber + indexChange)
        } else {
            setCardNumber(0) // skip the title card
        }
    }

    const read = (isEnglish: boolean = false) => {
        if (lesson) {
            const speechUtterance = new SpeechSynthesisUtterance()
            window.speechSynthesis.cancel()
            speechUtterance.voice = isEnglish ? englishVoice as SpeechSynthesisVoice : voice as SpeechSynthesisVoice
            speechUtterance.rate = speakingRate
            speechUtterance.text = lesson?.sentences[cardNumber][isEnglish ? "base_language" : "target_language"];
            window.speechSynthesis.speak(speechUtterance);
        }
        // Conditional is so we don't get an immediate readout before the lesson loads.. we could clean this up a lot still
    }

    return <>
        <div className="container">
            {
                lesson &&
                <div>
                    <div className="card">
                        <div className="flashcard-top">
                            {lesson.sentences[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                            <p>{lesson.sentences[cardNumber].base_language}</p>
                        </div>
                        <div className="flashcard-top">
                            <div style={{ borderBottom: "1px solid grey" }}></div>
                            {lesson.sentences[cardNumber].romanized ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{lesson.sentences[cardNumber]["romanized"]}</p> : null}
                            <div>{lesson.sentences[cardNumber].target_language}</div>
                        </div>
                    </div>
                </div >
            }
            <div className="controls-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <button onClick={() => setSpeakingRate(speakingRate + .1)}>speedup</button>
                    <button onClick={() => setSpeakingRate(speakingRate - .1)}>slowdown</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button style={{ backgroundColor: 'red', color: 'black', width: '25%' }} onClick={() => nextCard(-1)}>back</button>
                    <button style={{ backgroundColor: 'green', color: 'black', width: '25%' }} onClick={() => nextCard()}>next</button>
                </div>
                <div>
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
                    <label>
                        <input
                            type="checkbox"
                            checked={autoplay}
                            onChange={() => setAutoPlay(!autoplay)}
                        />
                        Autoplay
                    </label>
                </div>
            </div>
        </div>
    </>
}

export default FlashCardsV2;

