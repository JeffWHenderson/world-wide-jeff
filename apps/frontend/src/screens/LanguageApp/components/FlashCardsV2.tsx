import { useEffect, useState } from "react";
import useLanguage from "../hooks/useLanguage";
import { useParams } from "react-router-dom";
import "./flashcards.css"
import { addToDeck, getMyDeck } from "../hooks/useDecklist";

const FlashCardsV2 = () => {
    const { language, lessonId, section } = useParams();
    const [lesson, setLesson] = useState<any>(null)
    const [cardNumber, setCardNumber] = useState(0)
    const [autoplay, setAutoPlay] = useState(false)
    const [voice] = useLanguage(language as string)
    const [englishVoice] = useLanguage("english")
    const [readFront, setReadFront] = useState(true)
    const [readBack, setReadBack] = useState(true)
    const [hideTop, setHideTop] = useState(false)
    const [hideBottom, setHideBottom] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    // TODO: I can make delay dynamic... seems to work for spanish which is my focus for the moment
    const delay = 2000

    useEffect(() => {
        if (lessonId === 'custom-deck') {
            setLesson(getMyDeck(`${section}-custom-deck`))
        } else {
            fetch(`/${language?.toLowerCase()}/modules/${section}/flashcards/${lessonId}`)
                .then(res => res.json())
                .then(data => { console.log(data); setLesson(data) })
                .catch(err => console.error(err))
        }
    }, [])

    // // play after card number is updated
    useEffect(() => {
        readFrontPlease() // do in english
    }, [cardNumber, autoplay])

    const nextCard = (indexChange: number = 1) => {
        if (isRandom) {
            setCardNumber(Math.floor(Math.random() * (lesson.sentences.length - 1)))
            return // I know this is ugly but I don't need to overthink this right now
        }

        if (lesson.sentences.length - 1 > cardNumber) {
            setCardNumber(cardNumber + indexChange)
        } else {
            setCardNumber(0) // skip the title card
        }
    }

    const readFrontPlease = () => {
        if (readFront && lesson) {
            let readThis = lesson?.sentences[cardNumber]["base_language"];

            const speechUtterance = new SpeechSynthesisUtterance()
            window.speechSynthesis.cancel()
            speechUtterance.voice = englishVoice as SpeechSynthesisVoice
            speechUtterance.rate = 1
            speechUtterance.onend = () => {
                setTimeout(() => readBackPlease(), delay)
            }
            speechUtterance.text = readThis.replace(/\(.*?\)/g, "");  // Don't read anything in ()
            window.speechSynthesis.speak(speechUtterance);
        } else {
            readBackPlease()
        }
    }

    const readBackPlease = () => {
        if (readBack && lesson) {
            let readThis = lesson?.sentences[cardNumber]["target_language"];

            const speechUtterance = new SpeechSynthesisUtterance()
            window.speechSynthesis.cancel()
            speechUtterance.voice = voice as SpeechSynthesisVoice
            speechUtterance.rate = 1
            speechUtterance.onend = () => {
                if (autoplay) {
                    setTimeout(nextCard, delay)
                }
            }
            speechUtterance.text = readThis.replace(/\(.*?\)/g, ""); // Don't read anything in ()
            window.speechSynthesis.speak(speechUtterance);
        } else {
            if (readFront && autoplay) {
                setTimeout(() => nextCard(), delay)
            }
        }
    }



    return <>
        <div className="container">
            {
                lesson &&
                <div>
                    {/* <a href="/language-app/spanish/view-lesson/nouns_gender.txt">hello</a> */}
                    <div className="card">
                        <div className="flashcard-top">
                            {lesson.sentences[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                            {!hideTop && <p>{lesson.sentences[cardNumber].base_language}</p>}
                        </div>
                        <a style={{ marginLeft: "8px" }} onClick={() => setHideTop(!hideTop)}>{hideTop ? "unhide" : "hide"}</a>
                        <div className="flashcard-top">
                            <div style={{ borderBottom: "1px solid grey" }}></div>
                            {!hideBottom &&
                                <div>
                                    {lesson.sentences[cardNumber].romanized ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{lesson.sentences[cardNumber]["romanized"]}</p> : null}
                                    < div > {lesson.sentences[cardNumber].target_language}</div>
                                </div>
                            }
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-between", margin: "2px 5px 8px 7px" }}>
                            <a onClick={() => setHideBottom(!hideBottom)}>{hideBottom ? "unhide" : "hide"}</a>
                            {/* TODO: if its a custom deck remove button */}
                            {lessonId !== 'custom-deck' ?
                                <button
                                    style={{ marginBottom: '3px' }}
                                    onClick={() => addToDeck(lesson.sentences[cardNumber], `${section}-custom-deck`)}
                                >+</button>
                                :
                                <button
                                    style={{ marginBottom: '3px', backgroundColor: 'red', color: 'black' }}
                                    onClick={() => alert("Jeff still needs to add remove feature")}
                                >-</button>
                            }

                        </div>
                    </div>
                </div >
            }
            <div className="controls-container">
                <button style={{ backgroundColor: 'white', color: 'black', marginBottom: '10px', alignSelf: 'flex-end' }} onClick={() => setIsRandom(!isRandom)}>{isRandom ? "Unramdomize!!" : "Randomize!!"}</button>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
                    <div className="controller-box">
                        <button
                            className='back-button'
                            disabled={cardNumber === 0}
                            onClick={() => nextCard(-1)}>
                            {'<'}
                        </button>
                        <div className="controller-center">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={autoplay}
                                    onChange={() => setAutoPlay(!autoplay)}
                                />
                                Auto Flip
                            </label>
                        </div>
                        <div className="controller-center">
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
                        <button className='next-button' onClick={() => nextCard()}>{'>'}</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FlashCardsV2;

