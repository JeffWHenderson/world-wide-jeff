import { lesson1 } from "./Lessons/lesson1";
import { lesson2 } from "./Lessons/lesson2";
import { ai1 } from "./Lessons/aiTranslations";
import { ai2 } from "./Lessons/aiTranslations2";
import { people, bodyParts, animals, placesAndNature, objectsAndThings, foodAndDrinks, timeAndDates, abstractConcepts, otherCommonNouns } from "./Lessons/commonNouns200";
import { verbs } from "./Lessons/verbs";

export type Lesson = {
    lessonName: string;
    wordList: any[]
}


export const lessons: Lesson[] = [
    {
        lessonName: "people",
        wordList: people,
    },
    {
        lessonName: "body parts",
        wordList: bodyParts,
    },
    {
        lessonName: "animals",
        wordList: animals,
    },
    {
        lessonName: "places and nature",
        wordList: placesAndNature,
    },
    {
        lessonName: "verbs",
        wordList: verbs
    },
    {
        lessonName: "objects and things",
        wordList: objectsAndThings,
    },
    {
        lessonName: "food and drinks",
        wordList: foodAndDrinks,
    },
    {
        lessonName: "time and dates",
        wordList: timeAndDates,
    },
    {
        lessonName: "abstract concepts",
        wordList: abstractConcepts,
    },
    {
        lessonName: "other common nouns",
        wordList: otherCommonNouns,
    },
    {
        lessonName: "lesson 1",
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