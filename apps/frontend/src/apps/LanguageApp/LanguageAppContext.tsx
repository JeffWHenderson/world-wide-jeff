import { createContext, useContext, useState } from "react";

interface LanguageAppContextValue {
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
    autoplay: boolean;
    setAutoplay: (enabled: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
    showLiteral: boolean;
    setShowLiteral: (enabled: boolean) => void;
}

const LanguageAppContext = createContext<LanguageAppContextValue>({
    ttsEnabled: false,
    setTtsEnabled: () => {},
    autoplay: false,
    setAutoplay: () => {},
    volume: 1,
    setVolume: () => {},
    showLiteral: false,
    setShowLiteral: () => {},
});

export const LanguageAppProvider = ({ children }: { children: React.ReactNode }) => {
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [autoplay, setAutoplay] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showLiteral, setShowLiteralState] = useState(() => {
        return localStorage.getItem("srs_showLiteral") === "true";
    });

    const setShowLiteral = (enabled: boolean) => {
        localStorage.setItem("srs_showLiteral", String(enabled));
        setShowLiteralState(enabled);
    };

    return (
        <LanguageAppContext.Provider value={{ ttsEnabled, setTtsEnabled, autoplay, setAutoplay, volume, setVolume, showLiteral, setShowLiteral }}>
            {children}
        </LanguageAppContext.Provider>
    );
};

export const useLanguageApp = () => useContext(LanguageAppContext);
