// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessons, Lesson } from "./components/Lessons/LessonList"
import { stories } from "./components/Lessons/Stories/stories";
import { LessonV1 } from "./LanguageAppTypes";


const LanguageLearningApp = () => {
    const { language } = useParams();
    const navigator = useNavigate()

    function handleSelectStory(lessonType: string, lesson?: Lesson | LessonV1) {
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

