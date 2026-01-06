import { useEffect, useState } from "react";

const useLanguage = (selectedLanguage: string) => {
    let voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
    let [selectedVoice] = useState<SpeechSynthesisVoice | undefined>(voices[0])


    // has to wait on the inital page load from the browser then set the default voice
    useEffect(() => {
        const waitForBrowser = () => {
            let initialVoices = speechSynthesis.getVoices()

            // @ts-ignore
            selectedVoice = initialVoices.find((voice) => {
                return voice.name.toLowerCase() == "ting-ting" || voice.name.toLowerCase() == "tingting"
            });
        }

        setTimeout(waitForBrowser, 1000)
    }, [])

    if (selectedLanguage == "spanish") {
        selectedVoice = voices.find((voice) => {
            return voice.name.toLowerCase() == "paulina"
        });
    }
    if (selectedLanguage == "chinese") {
        let found = voices.find((voice) => {
            return voice.name.toLowerCase() == "ting-ting" || voice.name.toLowerCase() == "tingting"
        });
        if (!found) {
            found = voices.find((voice) => {
                return voice.lang.includes("zh-")
            })
        }
        selectedVoice = found
    }
    if (selectedLanguage == "japanese") {
        selectedVoice = voices.find((voice) => {
            return voice.name.toLocaleLowerCase() == "kyoko"
        });
    }
    if (selectedLanguage == "arabic") {
        selectedVoice = voices.find((voice) => {
            return voice.lang.toLowerCase() == "ar-sa"
        });
    }
    if (selectedLanguage == "english") {
        selectedVoice = voices.find(i => i.name.toLowerCase() == "samantha")
    }



    return [selectedVoice as SpeechSynthesisVoice, selectedLanguage as string]
};

export default useLanguage;