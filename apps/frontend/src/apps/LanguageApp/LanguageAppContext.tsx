import { createContext, useContext, useState } from "react";

interface LanguageAppContextValue {
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
    autoplay: boolean;
    setAutoplay: (enabled: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

const LanguageAppContext = createContext<LanguageAppContextValue>({
    ttsEnabled: false,
    setTtsEnabled: () => {},
    autoplay: false,
    setAutoplay: () => {},
    volume: 1,
    setVolume: () => {},
});

export const LanguageAppProvider = ({ children }: { children: React.ReactNode }) => {
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [autoplay, setAutoplay] = useState(false);
    const [volume, setVolume] = useState(1);

    return (
        <LanguageAppContext.Provider value={{ ttsEnabled, setTtsEnabled, autoplay, setAutoplay, volume, setVolume }}>
            {children}
        </LanguageAppContext.Provider>
    );
};

export const useLanguageApp = () => useContext(LanguageAppContext);
