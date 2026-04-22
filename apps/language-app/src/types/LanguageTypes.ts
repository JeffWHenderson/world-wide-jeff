export type CourseLevel = {
    section: string;
    lessons: LessonV1[]
}

export type LessonV1 = {
    name: string;
    type: string;
    sentences: Expression[];
}

export type Expression = {
    target_language: string;
    base_language: string;
    romanized?: string;
    grammar?: Grammar;
}

export type Grammar = {
    highlight: string;
    note: string;
}

export enum AvailableLanguages {
    chinese = "chinese",
    japanese = "japanese",
    spanish = "spanish"
}
