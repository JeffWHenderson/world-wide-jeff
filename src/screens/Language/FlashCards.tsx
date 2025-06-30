import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [displayLanguage, setDisplayLanguage] = useState("Spanish")

    const handleChangeDisplayLang = () => {
        if (displayLanguage == "Spanish") {
            setDisplayLanguage("ChinesePinyin")
        }
        if (displayLanguage == "ChinesePinyin") {
            setDisplayLanguage("arabic")
        }
        if (displayLanguage == "arabic") {
            setDisplayLanguage("Japanese")
        }
        if (displayLanguage == "Japanese") {
            setDisplayLanguage("English")
        }
        if (displayLanguage == "English") {
            setDisplayLanguage("Spanish")
        }
    }

    return <>
        <div onClick={handleChangeDisplayLang} style={{ margin: '8px' }}>
            {
                translations.map(phrase => (
                    <div>
                        <p>{phrase[displayLanguage]}</p>
                    </div>
                ))
            }
        </div>
    </>
}

export default FlashCards;

