'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useLanguage from "@/hooks/useLanguage";
import { addToDeck, getMyDeck } from "@/hooks/useDecklist";
import "@/styles/flashcards.css";

const FlashCardsV2 = () => {
    const { language, lessonId, section } = useParams<{ language: string; lessonId: string; section: string }>();
    const [lesson, setLesson] = useState<any>(null)
    const [cardNumber, setCardNumber] = useState(0)
    const [autoplay, setAutoPlay] = useState(false)
    const { selectedVoice: voice } = useLanguage(language as string)
    const { selectedVoice: englishVoice } = useLanguage("english")
    const [readFront, setReadFront] = useState(false)
    const [readBack, setReadBack] = useState(false)
    const [hideTop, setHideTop] = useState(false)
    const [hideBottom, setHideBottom] = useState(false)
    const [isRandom, setIsRandom] = useState(false)
    const [top, setTop] = useState("loading")
    const [bottom, setBottom] = useState("loading")
    const [reverseCards, setReverseCards] = useState(false)

    const delay = 2000

    useEffect(() => {
        if (lessonId === 'custom-deck') {
            const myDeck = getMyDeck(`${section}-custom-deck`)
            setTop(myDeck.sentences[0].base_language)
            setBottom(myDeck.sentences[0].target_language)
            setLesson(myDeck)
        } else {
            fetch(`/${language?.toLowerCase()}/modules/${section}/flashcards/${lessonId}.json`)
                .then(res => res.json())
                .then(data => {
                    setTop(data.sentences[0].base_language)
                    setBottom(data.sentences[0].target_language)
                    setLesson(data)
                })
                .catch(err => console.error(err))
        }
    }, [])

    useEffect(() => {
        if (lesson) {
            if (reverseCards) {
                setTop(lesson?.sentences[cardNumber]["target_language"])
                setBottom(lesson?.sentences[cardNumber]["base_language"])
            } else {
                setTop(lesson?.sentences[cardNumber]["base_language"])
                setBottom(lesson?.sentences[cardNumber]["target_language"])
            }
        }
    }, [cardNumber, reverseCards])

    useEffect(() => {
        readFrontPlease()
    }, [top, bottom, autoplay])

    const nextCard = (indexChange: number = 1) => {
        if (isRandom) {
            setCardNumber(Math.floor(Math.random() * (lesson.sentences.length - 1)))
            return
        }

        if (lesson.sentences.length - 1 > cardNumber) {
            setCardNumber(cardNumber + indexChange)
        } else {
            setCardNumber(0)
        }
    }

    const readFrontPlease = () => {
        if (readFront && lesson) {
            const speechUtterance = new SpeechSynthesisUtterance()
            window.speechSynthesis.cancel()
            speechUtterance.voice = !reverseCards ? englishVoice as SpeechSynthesisVoice : voice as SpeechSynthesisVoice
            speechUtterance.rate = 1
            speechUtterance.onend = () => {
                setTimeout(() => readBackPlease(), delay)
            }
            speechUtterance.text = top.replace(/\(.*?\)/g, "");
            window.speechSynthesis.speak(speechUtterance);
        } else {
            readBackPlease()
        }
    }

    const readBackPlease = () => {
        if (readBack && lesson) {
            const speechUtterance = new SpeechSynthesisUtterance()
            window.speechSynthesis.cancel()
            speechUtterance.voice = reverseCards ? englishVoice as SpeechSynthesisVoice : voice as SpeechSynthesisVoice
            speechUtterance.rate = 1
            speechUtterance.onend = () => {
                if (autoplay) {
                    setTimeout(nextCard, delay)
                }
            }
            speechUtterance.text = bottom.replace(/\(.*?\)/g, "");
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
                    <div className="card">
                        <div className="flashcard-top">
                            {lesson.sentences[cardNumber].picture ? <div>TODO: add pictures to the flashcards</div> : null}
                            {!hideTop && <p>{top}</p>}
                        </div>
                        <a style={{ marginLeft: "8px" }} onClick={() => setHideTop(!hideTop)}>{hideTop ? "unhide" : "hide"}</a>
                        <div className="flashcard-top">
                            <div style={{ borderBottom: "1px solid grey" }}></div>
                            {!hideBottom &&
                                <div>
                                    {lesson.sentences[cardNumber].romanized ? <p style={{ margin: '0px', color: 'red', height: "1.5em", fontSize: '.5em' }}>{lesson.sentences[cardNumber]["romanized"]}</p> : null}
                                    <div>{bottom}</div>
                                </div>
                            }
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-between", margin: "2px 5px 8px 7px" }}>
                            <a onClick={() => setHideBottom(!hideBottom)}>{hideBottom ? "unhide" : "hide"}</a>
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
                </div>
            }
            <button onClick={() => setReverseCards(!reverseCards)}>flipCards</button>
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
