import { useState } from "react";
import { translations } from "./translations";

const FlashCards = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Chinese")
    const [cardNumber, setCardNumber] = useState(0)
    const [showEnglish] = useState(true)

    /*
    useEffect(() => {
      window.addEventListener("keydown", onKeyDown); // Add event listener for keydown event
      //return () => {
        //window.removeEventListener("keydown", onKeyDown); // Remove event listener on component unmount
      //};
    }, []);

    const onKeyDown = (e: any) => {

      if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
         console.log("space-bar")
         nextCard();
      }
    }
    */

    function speak(phrase: string, lang: string) {
        window.speechSynthesis.cancel()
        let voices = speechSynthesis.getVoices();
        const message = new SpeechSynthesisUtterance();

        let selectedVoice: any = voices[0]

        if (lang == "Spanish") {
            selectedVoice = voices.find((voice) => {
                return voice.name.toLowerCase() == "paulina"
            });
        }
        if (lang == "Chinese") {
            let found = voices.find((voice) => {
                return voice.name.toLowerCase() == "ting-ting" || voice.name.toLowerCase() == "tingting"
            });
            selectedVoice = found
        }
        if (lang == "Japanese") {
            selectedVoice = voices.find((voice) => {
                return voice.name.toLocaleLowerCase() == "kyoko"
            });
        }
        if (lang == "arabic") {
            selectedVoice = voices.find((voice) => {
                return voice.lang == "ar-SA"
            });
        }
        if (lang == "English") {
            selectedVoice = voices.find(i => i.name.toLowerCase() == "samantha")
        }

        message.voice = selectedVoice ? selectedVoice : voices[0]
        message.text = phrase;
        window.speechSynthesis.speak(message);
    }

    const nextCard = () => {
        setCardNumber(cardNumber + 1)
        if (selectedLanguage !== "None") {
            speak(translations[cardNumber + 1][selectedLanguage], selectedLanguage)
        }
    }

    return <div style={{ height: '85vh', width: '100vw' }}>

        <div style={{ height: '70%', marginLeft: "10%" }}>
            {showEnglish ? <h3>{translations[cardNumber]["English"]}</h3> : null}
            <div style={{ fontSize: '2em' }} onClick={() => speak(translations[cardNumber][selectedLanguage], selectedLanguage)}>
                {selectedLanguage === "arabic" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Arabic-English"]}</p> : null}
                {selectedLanguage === "Japanese" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["Romanji"]}</p> : null}
                {selectedLanguage === "Chinese" ? <p style={{ color: 'red', height: "1.5em" }}>{translations[cardNumber]["ChinesePinyin"]}</p> : null}
                <p>{translations[cardNumber][selectedLanguage]}</p>
            </div>
        </div >

        <div style={{ display: 'flex', height: '10%', width: '100%', justifyContent: 'center', alignContent: 'space-between' }}>
            <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="arabic">Arabic</option>
                <option value="English">English</option>
            </select>

            <button style={{ margin: '10px' }} onClick={() => nextCard()}>next</button>
        </div>
    </div>
}

export default FlashCards;

