import { lesson1 } from "./Lessons/lesson1";
import { lesson2 } from "./Lessons/lesson2";
import { ai1 } from "./Lessons/aiTranslations";
import { ai2 } from "./Lessons/aiTranslations2";
import { commonNouns200 } from "./Lessons/commonNouns200";

export type Lesson = {
    lessonName: string;
    wordList: any[]
}


export const lessons: Lesson[] = [
    {
        lessonName: "200 most common nouns",
        wordList: commonNouns200,
    },
    {
        lessonName: "first 100 words",
        wordList: lesson1,
    },
    {
        lessonName: '201-300',
        wordList: lesson2,
    },
    {
        lessonName: 'pretty wonky ai list 1',
        wordList: ai1
    },
    {
        lessonName: 'pretty wonky ai list 2',
        wordList: ai2
    }
]