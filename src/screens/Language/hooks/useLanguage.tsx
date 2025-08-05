import { useEffect } from "react";

const useLanguage = (selectedLanguage: string) => {
    console.log(selectedLanguage)

    // has to wait on the inital page load from the browser then set the default voice
    useEffect(() => {
        const waitForBrowser = () => {
            let initialVoices = speechSynthesis.getVoices()

            // @ts-ignore
            speechUtterance.voice = initialVoices.find((voice) => {
                return voice.name.toLowerCase() == "ting-ting" || voice.name.toLowerCase() == "tingting"
            });
        }

        setTimeout(waitForBrowser, 1000)
    }, [])


    let voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
    let selectedVoice: any = voices[0]
    if (selectedLanguage == "Spanish") {
        selectedVoice = voices.find((voice) => {
            return voice.name.toLowerCase() == "paulina"
        });
    }
    if (selectedLanguage == "Chinese") {
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
    if (selectedLanguage == "Japanese") {
        selectedVoice = voices.find((voice) => {
            return voice.name.toLocaleLowerCase() == "kyoko"
        });
    }
    if (selectedLanguage == "Arabic") {
        selectedVoice = voices.find((voice) => {
            return voice.lang.toLowerCase() == "ar-sa"
        });
    }
    if (selectedLanguage == "English") {
        selectedVoice = voices.find(i => i.name.toLowerCase() == "samantha")
    }



    return [selectedVoice, selectedLanguage as string]
};

export default useLanguage;