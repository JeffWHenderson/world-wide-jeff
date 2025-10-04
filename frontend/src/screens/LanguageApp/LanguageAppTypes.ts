export type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    romanized?: string;
    grammar?: Grammar;
}

export type Grammar = { // TODO: this is lazy
    highlight: string;
    note: string;
}

export type LessonV1 = {
    name: string;
    type: string;
    sentences: Expression[];
}

export type CourseLevel = {
    section: string;
    lessons: LessonV1[]
}

export enum AvailableLanguages { // I HATE ENUMS but whatever, I guess they work
    chinese = "Chinese",
    japanese = "Japanese",
    spanish = "Spanish"
}
