import { createContext } from 'react';

const defaultSettings = { 
    speed: 1,
    targetLanguageVoice: null,
    baseLanguageVoice: null,
    delayBetween: 1,
    readFront: true,
    readBack: true,
    randomize: false,
    reverseCards: false
}

export const LanguageSettingsContext = createContext<any>(defaultSettings);

export const LanguageSettingsProvider = ({ children }: any) => (
    <LanguageSettingsContext.Provider value={defaultSettings}>
        {children}
    </LanguageSettingsContext.Provider>
);