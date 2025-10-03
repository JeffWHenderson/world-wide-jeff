export type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    romanized?: string;
    grammar?: any;  // TODO: type
}

export type LessonV1 = {
    name: string;
    type: string;
    sentences: Expression[];
}

export enum AvailableLanguages { // I HATE ENUMS but whatever, I guess they work
    chinese = "Chinese",
    japanese = "Japanese",
    spanish = "Spanish"
}
