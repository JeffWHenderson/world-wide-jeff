// THIS CODE IS TRASH -- I'm just seeing if this is useful for me at all
// ALSO I KNOW THE IMAGES ARE TERRIBLE AI SLOP - I wouldn't let this fly if I wasn't experimenting

import { useEffect, useState } from "react"
import useLanguage from "../../hooks/useLanguage"
import { useParams } from "react-router-dom";
import './picturePopUp.css'

const PicturePopUp = () => {
    // OKAY HERE ME OUT, I'm going to make this a story type thing that has a moving marker to help identify what is the subject... its going to be so cool
    const { language, section } = useParams();
    const [voice] = useLanguage(language as string) // Clean this up too
    const [speechBubbles, setSpeechBubbles] = useState<any>(null)
    const [subtitle, setSubtitle] = useState<string | undefined>(undefined)

    useEffect(() => {
        fetch(`/${language}/pictureLessons/${section}.json`)
            .then(res => res.json())
            .then(data => { setSpeechBubbles(data) })
            .catch(err => err)
    }, [])

    const handleClickDot = (i: number) => {
        setSubtitle(speechBubbles?.dots[i].sentences[0].target_language)
        read(i)
    }

    const read = (i: number) => {
        const speechUtterance = new SpeechSynthesisUtterance()
        speechUtterance.voice = voice as SpeechSynthesisVoice
        speechUtterance.rate = 1

        speechUtterance.text = speechBubbles?.dots[i].sentences[0].target_language

        window.speechSynthesis.speak(speechUtterance);
    };

    return <div className="pop-up-container">
        <div className="picture-container">
            {
                speechBubbles?.dots.map((dot: any, index: number) => (<div
                    className="circle"
                    style={{ position: 'absolute', top: dot.top, left: dot.left }}
                    onClick={() => handleClickDot(index)}
                ></div>
                ))
            }
            <img
                className="picture-style"
                src={`/${section}.png`}
                alt={`${section}`}
            />
        </div>
        <div>
            {subtitle && <div>{subtitle}</div>}
            <div style={{ width: '100%', marginTop: '70px' }}>
                <div><h3>Describe as much as you can!</h3></div>
                <div><h4>Sorry this is AI slop, I'm just testing this out</h4></div>
            </div>
        </div>
    </div>
}

export default PicturePopUp