import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./main-styles.css"
import { getMyDeck } from "./hooks/useDecklist";

const LanguageLearningApp = () => {

    const { language } = useParams();
    const navigator = useNavigate()
    const [course, setCourse] = useState<any | null>(null);

    // TODO: move this to have light and dark mode
    // // Function to set the theme
    // function setTheme() {
    //     document.body.classList.toggle("dark-mode");
    // }
    // <button id="theme-toggle" onClick={() => setTheme()}>Toggle Dark Mode</button>


    useEffect(() => {
        fetch(`/${language}/course.json`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [language])


    function handleSelectStory(lessonType: string, lesson: any, level_id: string) {
        if (lessonType === "wordlist") {
            navigator(`wordlist/${level_id}/${lesson.filename}`)
        } else if (lessonType === 'flashcard' || lessonType === 'flashcards') {
            navigator(`flashcards/${level_id}/${lesson.filename}`)
        } else if (lessonType === 'story') {
            navigator(`story/${level_id}/${lesson.filename}`)
        } else if (lessonType === 'custom-deck') {
            navigator(`my-decks/${level_id}/custom-deck`)
        } else {
            alert("The developer screwed up if this didn't work")
        }
    }

    function specialCall(levelId: string) {
        const specialDeck = getMyDeck(`${levelId}-custom-deck`)
        return <button
            key={`mydeck-${levelId}`}
            className="customLessonCard"
            onClick={() => handleSelectStory("custom-deck", specialDeck, levelId)}>
            custom deck
        </button>
    }

    return (
        <>
            <div style={{ maxWidth: '100vw' }}>
                <div>
                    <h2 className="course-header">{course?.course_name}</h2>
                </div>
                {course?.course_levels.map((level: any) => (
                    <div key={level.level_id}>
                        <h3 className="section-header">{level.level_name}</h3>
                        <div style={{ overflowY: 'auto' }}>
                            <div style={{ padding: '10px', display: "flex", marginTop: '4px' }}>
                                {level.lessons.map((lesson: any) => (
                                    lesson.type !== 'story' &&
                                    <button
                                        key={lesson.filename}
                                        className="flashCardLessonCard"
                                        onClick={() => handleSelectStory(lesson.type, lesson, level.level_id)}>
                                        {lesson.name}
                                    </button>
                                ))}
                                {
                                    specialCall(level.level_id)
                                }
                            </div>
                            <div style={{ padding: '10px', display: "flex", marginTop: '4px' }}>
                                {level.lessons.map((lesson: any) => (
                                    lesson.type === 'story' &&
                                    <button
                                        key={lesson.filename}
                                        className="storyLessonCard"
                                        onClick={() => handleSelectStory(lesson.type, lesson, level.level_id)}>
                                        {lesson.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default LanguageLearningApp;

