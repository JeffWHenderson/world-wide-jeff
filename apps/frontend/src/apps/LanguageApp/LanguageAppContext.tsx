import { createContext, useContext, useState } from "react";

interface LanguageAppContextValue {
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
    fastMode: boolean;
    setFastMode: (enabled: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
    showLiteral: boolean;
    setShowLiteral: (enabled: boolean) => void;
    shuffleCards: boolean;
    setShuffleCards: (enabled: boolean) => void;
}

const LanguageAppContext = createContext<LanguageAppContextValue>({
    ttsEnabled: false,
    setTtsEnabled: () => {},
    fastMode: false,
    setFastMode: () => {},
    volume: 1,
    setVolume: () => {},
    showLiteral: false,
    setShowLiteral: () => {},
    shuffleCards: false,
    setShuffleCards: () => {},
});

export const LanguageAppProvider = ({ children }: { children: React.ReactNode }) => {
    const [ttsEnabled, setTtsEnabled] = useState(true);
    const [fastMode, setFastMode] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showLiteral, setShowLiteralState] = useState(() => {
        return localStorage.getItem("srs_showLiteral") === "true";
    });

    const setShowLiteral = (enabled: boolean) => {
        localStorage.setItem("srs_showLiteral", String(enabled));
        setShowLiteralState(enabled);
    };

    const [shuffleCards, setShuffleCardsState] = useState(() => {
        return localStorage.getItem("srs_shuffleCards") === "true";
    });

    const setShuffleCards = (enabled: boolean) => {
        localStorage.setItem("srs_shuffleCards", String(enabled));
        setShuffleCardsState(enabled);
    };

    return (
        <LanguageAppContext.Provider value={{ ttsEnabled, setTtsEnabled, fastMode, setFastMode, volume, setVolume, showLiteral, setShowLiteral, shuffleCards, setShuffleCards }}>
            {children}
        </LanguageAppContext.Provider>
    );
};

export const useLanguageApp = () => useContext(LanguageAppContext);
