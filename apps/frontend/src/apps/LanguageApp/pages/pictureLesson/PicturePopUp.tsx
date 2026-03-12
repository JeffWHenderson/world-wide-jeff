// THIS CODE IS TRASH -- I'm just seeing if this is useful for me at all
// ALSO I KNOW THE IMAGES ARE TERRIBLE AI SLOP - I wouldn't let this fly if I wasn't experimenting

import { useState } from "react"
import useLanguage from "../../hooks/useLanguage"
import { useParams } from "react-router-dom";

const pictureInput = {
    dots: [
        {
            top: "50%",
            left: "40%",
            sentences: [
                { base_language: "this is a girl with a blue shirt", target_language: "esta es una chica con una camiseta azul" }
            ]
        },
        {
            top: "35%",
            left: "58%",
            sentences: [
                { base_language: "She is stiring batter", target_language: "Ella está revolviendo la masa" }
            ]
        },
        {
            top: "39%",
            left: "28%",
            sentences: [
                { base_language: "This is a frying pan", target_language: "Esta es una sartén" }
            ]
        },
        {
            top: "38%",
            left: "74%",
            sentences: [
                { base_language: "A guy is putting cookies in the oven", target_language: "Un chico está poniendo galletas en el horno." }
            ]
        },
        {
            top: "41%",
            left: "87%",
            sentences: [
                { base_language: "The waiter is serving pasta", target_language: "El camarero está sirviendo pasta." }
            ]
        },
        {
            top: "69%",
            left: "12%",
            sentences: [
                { base_language: "There is bread is on the table.", target_language: "Hay pan en la mesa." }
            ]
        }
    ]
}

const PicturePopUp = () => {
    // OKAY HERE ME OUT, I'm going to make this a story type thing that has a moving marker to help identify what is the subject... its going to be so cool
    const { language, section } = useParams();
    const [voice] = useLanguage(language as string)
    const [subtitle, setSubtitle] = useState<string | undefined>(undefined)


    const handleClickDot = (i: number) => {
        setSubtitle(pictureInput.dots[i].sentences[0].target_language)
        read(i)
    }

    const read = (i: number) => {
        const speechUtterance = new SpeechSynthesisUtterance()
        speechUtterance.voice = voice as SpeechSynthesisVoice
        speechUtterance.rate = 1

        speechUtterance.text = pictureInput.dots[i].sentences[0].target_language

        window.speechSynthesis.speak(speechUtterance);
    };

    // const movePointer = (verticle: string, horizontal: string) => {
    //     setPointerPositionVertical(verticle)
    //     setPointerPositionHorizontal(horizontal)
    // }

    return section ? <div className="pop-up-container">
        <div className="picture-container">
            {
                pictureInput.dots.map((dot: any, index: number) => (<div
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
    </div> :
        <></>
}

export default PicturePopUp