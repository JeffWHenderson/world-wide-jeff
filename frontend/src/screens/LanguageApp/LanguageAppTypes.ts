export type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    grammar?: any;  // TODO: type
}

export type Story = {
    name: string;
    sentences: Expression[];
}

export enum AvailableLanguages { // I HATE ENUMS but whatever, I guess they work
    chinese = "Chinese",
    japanese = "Japanese",
    spanish = "Spanish"
}
