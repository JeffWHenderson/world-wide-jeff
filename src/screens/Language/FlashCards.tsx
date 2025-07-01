import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [displayLanguage, setDisplayLanguage] = useState("Spanish")
    const [displayCharacters, setDisplayCharacters] = useState<string | null>(null)

    const handleChangeDisplayLang = () => {
        if (displayLanguage == "Spanish") {
            setDisplayCharacters("Chinese")
            setDisplayLanguage("ChinesePinyin")
        }
        if (displayLanguage == "ChinesePinyin") {
            setDisplayCharacters("Romanji")
            setDisplayLanguage("Japanese")
        }
        if (displayLanguage == "Japanese") {
            setDisplayCharacters("Arabic-English")
            setDisplayLanguage("arabic")
        }
        if (displayLanguage == "arabic") {
            setDisplayCharacters(null)
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
                    <div style={{ height: "3em" }}>
                        <div style={{ height: "1.5em" }}>{phrase[displayLanguage]}</div>
                        {displayCharacters ? <div style={{ color: 'red', height: "1.5em" }}>{phrase[displayCharacters]}</div> : null}
                    </div>
                ))
            }
        </div>
    </>
}

export default FlashCards;

