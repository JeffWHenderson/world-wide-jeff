import { createContext, useContext, useState } from "react";

interface LanguageAppContextValue {
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
}

const LanguageAppContext = createContext<LanguageAppContextValue>({
    ttsEnabled: false,
    setTtsEnabled: () => {},
});

export const LanguageAppProvider = ({ children }: { children: React.ReactNode }) => {
    const [ttsEnabled, setTtsEnabled] = useState(false);

    return (
        <LanguageAppContext.Provider value={{ ttsEnabled, setTtsEnabled }}>
            {children}
        </LanguageAppContext.Provider>
    );
};

export const useLanguageApp = () => useContext(LanguageAppContext);
