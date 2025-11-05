import { useNavigate, useParams } from "react-router-dom";
import { LessonV1 } from "./LanguageTypes";
import { courses } from "./courses/courses"; // TODO: obviously this will come from backend
import { useEffect, useState } from "react";


// TODO: add CSS Eventually
const storyCardStyles = {
    backgroundColor: 'red',
    marginRight: "3px"
}

// TODO: add CSS Eventually
const flashCardStyles = {
    backgroundColor: 'orange',
    marginRight: "3px"
}

const LanguageLearningApp = () => {
    const { language } = useParams();
    const navigator = useNavigate()
    const [course, setCourse] = useState(courses.Chinese);

    useEffect(() => {
        if (language === "Spanish") { // TODO: obviously this will come from backend
            setCourse(courses.Spanish)
        }
        if (language === "Japanese") {
            setCourse(courses.Japanese)
        }
        if (language === "Chinese") {
            setCourse(courses.Chinese)
        }
    }, [language])


    function handleSelectStory(lessonType: string, lesson?: LessonV1) {
        if (lessonType === 'flashcard' || lessonType === 'flashcards') {
            navigator(`flashcards`, { state: { lesson: lesson, selectedLanguage: language } })
        } else {
            navigator(`story`, { state: { lesson: lesson, selectedLanguage: language } })
        }
    }

    return (
        <>
            <h1>Leaning in {language}</h1>
            <p>{course[0].section}</p>
            <div style={{ display: "flex", marginTop: '4px' }}>
                {
                    course[0].lessons.map(lesson => (
                        <button style={lesson.type === "story" ? storyCardStyles : flashCardStyles} onClick={() => handleSelectStory(lesson.type, lesson)} >{lesson.name}</button>
                    ))
                }
            </div>
        </>
    )
}

export default LanguageLearningApp;

