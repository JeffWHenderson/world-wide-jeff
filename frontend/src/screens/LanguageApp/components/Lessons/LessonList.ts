import { LessonV1 } from "../../LanguageAppTypes";


export const lessons: LessonV1[] = [
    {
        name: "people",
        type: "flashcards",
        sentences: [
            {
                targetLanguage: "hello todo el mundo",
                baseLanguage: "Hello World.",
                grammar: {
                    highlight: "todo el mundo",
                    note: "literal: all the world"
                }
            },
                        {
                targetLanguage: "dos",
                baseLanguage: "two",
                grammar: {
                    highlight: "dos",
                    note: "i don't care about giving this a note"
                }
            },
                        {
                targetLanguage: "tres",
                baseLanguage: "three",
            }
        ]
    }
    // {
    //     lessonName: "people",
    //     wordList: people,
    // },
    // {
    //     lessonName: "body parts",
    //     wordList: bodyParts,
    // },
    // {
    //     lessonName: "animals",
    //     wordList: animals,
    // },
    // {
    //     lessonName: "places and nature",
    //     wordList: placesAndNature,
    // },
    // {
    //     lessonName: "verbs",
    //     wordList: verbs
    // },
    // {
    //     lessonName: "objects and things",
    //     wordList: objectsAndThings,
    // },
    // {
    //     lessonName: "food and drinks",
    //     wordList: foodAndDrinks,
    // },
    // {
    //     lessonName: "time and dates",
    //     wordList: timeAndDates,
    // },
    // {
    //     lessonName: "abstract concepts",
    //     wordList: abstractConcepts,
    // },
    // {
    //     lessonName: "other common nouns",
    //     wordList: otherCommonNouns,
    // },
    // {
    //     lessonName: "lesson 1",
    //     wordList: lesson1,
    // },
    // {
    //     lessonName: '201-300',
    //     wordList: lesson2,
    // },
    // {
    //     lessonName: 'pretty wonky ai list 1',
    //     wordList: ai1
    // },
    // {
    //     lessonName: 'pretty wonky ai list 2',
    //     wordList: ai2
    // }
]