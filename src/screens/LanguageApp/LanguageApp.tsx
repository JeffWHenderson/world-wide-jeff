// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessons, Lesson } from "./components/Lessons/LessonList"

export type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    grammar?: any;  // TODO: type
}

export type Story = {
    name: string;
    sentences: Expression[];
}

const stories: Story[] = [
    {
        name: "intro lesson",
        sentences: [
            {
                targetLanguage: "Hola todo el mundo.",
                baseLanguage: "Hello World.",
                grammar: {
                    highlight: "todo el mundo",
                    note: "literal: all the world"
                }
            },
            {
                targetLanguage: "Bienbenidos a mi applicacion",
                baseLanguage: "welcome to my app",
                grammar: {
                    highlight: "applicacion",
                    note: "inflection on the i"
                }
            },
            {
                targetLanguage: "soy un enginero",
                baseLanguage: "I'm an engineer",
                grammar: null
            },
        ]
    },
    {
        name: "second Lesson",
        sentences: [
            {
                targetLanguage: `我的朋友
                                我爸爸和妈妈是老师。我是学生。
                                我有一个朋友。她是女人。她叫小月。她很高。
                                今天，我喝水，她喝茶。我说：“你好吗？”
                                她说：“我很好。你好吗？”
                                我说：“我也很好。”
                                她说：“再见！”
                                我说：“再见！”
                                我们都很高兴。`,
                baseLanguage: `My Friend
                            My father and mother are teachers. I am a student.
                            I have a friend. She is a woman. Her name is Xiao Yue. She is very tall.
                            Today, I drink water, she drinks tea. I say: "How are you?"
                            She says: "I am very good. How are you?"
                            I say: "I am also very good."
                            She says: "Goodbye!"
                            I say: "Goodbye!"
                            We are all very happy.`,
                grammar: {
                    highlight: "我是学生",
                    note: "literal: I am some words or something"
                }
            }
        ]
    }
]



const LanguageLearningApp = () => {
    const { language } = useParams();
    const navigator = useNavigate()

    function handleSelectStory(lessonType: string, lesson?: Lesson | Story) {
        if (lessonType === 'flashcard') {
            navigator(`flashcards`, { state: { lesson: lesson, selectedLanguage: language } })
        } else {
            navigator(`story`, { state: { lesson: lesson, selectedLanguage: language } })
        }
    }

    return (
        <>
            <h1>Leaning in {language}</h1>
            <p>Flashcards: Beginner</p>
            <div style={{ display: "flex", }}>
                {
                    lessons.map(lesson => (
                        <button style={{ backgroundColor: 'green', marginRight: "3px" }} onClick={() => handleSelectStory('flashcard', lesson)} >{lesson.lessonName}</button>
                    ))
                }
            </div>
            <p>Stories: Level 1</p>
            <div style={{ display: "flex", marginTop: '4px' }}>
                {
                    stories.map(story => (
                        <button style={{ backgroundColor: 'red', marginRight: "3px" }} onClick={() => handleSelectStory('story', story)} >{story.name}</button>
                    ))
                }
            </div>
        </>
    )
}

export default LanguageLearningApp;

