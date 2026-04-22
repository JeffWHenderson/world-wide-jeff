'use client'

import { useEffect, useState } from "react";

const useLanguage = (selectedLanguage: string) => {
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | undefined>(undefined);

    useEffect(() => {
        const pickVoice = () => {
            const voices = speechSynthesis.getVoices();

            let found: SpeechSynthesisVoice | undefined;

            if (selectedLanguage === "spanish") {
                found = voices.find((v) => v.name.toLowerCase() === "paulina");
            } else if (selectedLanguage === "chinese") {
                found = voices.find((v) =>
                    v.name.toLowerCase() === "ting-ting" || v.name.toLowerCase() === "tingting"
                );
                if (!found) {
                    found = voices.find((v) => v.lang.includes("zh-"));
                }
            } else if (selectedLanguage === "japanese") {
                found = voices.find((v) => v.name.toLowerCase() === "kyoko");
            } else if (selectedLanguage === "arabic") {
                found = voices.find((v) => v.lang.toLowerCase() === "ar-sa");
            } else if (selectedLanguage === "english") {
                found = voices.find((v) => v.name.toLowerCase() === "samantha");
            }

            setSelectedVoice(found ?? voices[0]);
        };

        if (speechSynthesis.getVoices().length > 0) {
            pickVoice();
        } else {
            speechSynthesis.addEventListener("voiceschanged", pickVoice);
            return () => speechSynthesis.removeEventListener("voiceschanged", pickVoice);
        }
    }, [selectedLanguage]);

    const speak = (text: string, onEnd?: () => void) => {
        if (!selectedVoice) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = 1;
        if (onEnd) utterance.onend = onEnd;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    return { selectedVoice, speak };
};

export default useLanguage;
