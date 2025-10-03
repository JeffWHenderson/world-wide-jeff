// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessons, Lesson } from "./components/Lessons/LessonList"
import { LessonV1 } from "./LanguageAppTypes";
import { courses } from "./courses/courses"; // TODO: obviously this will come from backend
import { useEffect, useState } from "react";


const LanguageLearningApp = () => {
    const { language } = useParams();
    const navigator = useNavigate()
    const [course, setCourse] = useState(courses.Chinese);

    useEffect(() => {
        if (language != "Chinese") { // TODO: obviously this will come from backend
            setCourse(courses.Spanish)
        } else {
            setCourse(courses.Chinese)
        }
    }, [language])


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
            <p>{course.section}</p>
            <div style={{ display: "flex", marginTop: '4px' }}>
                {
                    course.lessons.map(lesson => (
                        <button style={{ backgroundColor: 'red', marginRight: "3px" }} onClick={() => handleSelectStory(lesson.type, lesson)} >{lesson.name}</button>
                    ))
                }
            </div>
        </>
    )
}

export default LanguageLearningApp;

