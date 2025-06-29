import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [cardFront] = useState("English")
    const [cardBack, setCardBack] = useState(["Spanish"])
    const [indexNum, setIndex] = useState(0)

    console.log(translations)
    const handleClick = (lang: string) => {
        setCardBack([lang, ...cardBack])
    }

    return <>
        <button onClick={() => handleClick("English")}>English</button>
        <button onClick={() => handleClick("ChinesePinyin")}>ChinesePinyin</button>
        <button onClick={() => handleClick("Chinese")}>Chinese</button>
        <button onClick={() => handleClick("arabic")}>Arabic</button>
        <button onClick={() => handleClick("Japanese")}>Japanese</button>
        <p>{translations[indexNum][cardFront]}</p>
        <p>-----</p>
        {
            cardBack.map(targetLang => (
                <p>{translations[indexNum][targetLang]}</p>
            ))
        }
        <button onClick={() => setIndex(indexNum + 1)}>next</button>
    </>
}

export default FlashCards;

