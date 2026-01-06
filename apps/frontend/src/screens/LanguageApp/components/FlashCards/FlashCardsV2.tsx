import { useEffect, useState } from "react";
import useLanguage from "../../hooks/useLanguage";
import { useParams } from "react-router-dom";

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
        fetch(`/${language?.toLowerCase()}/00/${lessonId}`) // TODO: remove hardcoding
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
            speechUtterance.text = lesson?.sentences[cardNumber][isEnglish ? "baseLanguage" : "targetLanguage"];
            window.speechSynthesis.speak(speechUtterance);
        }
        // Conditional is so we don't get an immediate readout before the lesson loads.. we could clean this up a lot still
    }

    return <div style={{ height: '82%', margin: '0% 3% 0% 3%', justifyContent: 'center' }}>
        <div style={{ display: 'flex', marginBottom: '10px', width: '100%' }}>
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
        {
            lesson &&
            <div style={{ height: '70%', justifyContent: 'center' }}>
                <div>
                    <div style={{ width: '100%' }}>
                        {lesson.sentences[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                        <p>{lesson.sentences[cardNumber].baseLanguage}</p>
                    </div>
                    <div style={{ fontSize: '2em' }}>
                        <div style={{ borderBottom: "1px solid grey" }}></div>
                        {lesson.sentences[cardNumber].romanized ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{lesson.sentences[cardNumber]["romanized"]}</p> : null}
                        <div>{lesson.sentences[cardNumber].targetLanguage}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <button onClick={() => setSpeakingRate(speakingRate + .1)}>speedup</button>
                    <button onClick={() => setSpeakingRate(speakingRate - .1)}>slowdown</button>
                </div>
                <div style={{ display: 'flex', height: '10%', justifyContent: 'space-between' }}>
                    <button style={{ backgroundColor: 'red', color: 'black', width: '25%' }} onClick={() => nextCard(-1)}>back</button>
                    <button style={{ backgroundColor: 'green', color: 'black', width: '25%' }} onClick={() => nextCard()}>next</button>
                </div>
            </div >
        }
    </div>
}

export default FlashCardsV2;

