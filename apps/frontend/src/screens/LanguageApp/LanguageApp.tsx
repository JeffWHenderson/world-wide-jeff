import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./main-styles.css"


// TODO: add CSS Eventually
const storyCardStyles = {
    backgroundColor: 'red',
    color: 'black',
    marginRight: "7px"
}

// TODO: add CSS Eventually
const flashCardStyles = {
    backgroundColor: 'darkGrey',
    color: 'black',
    marginRight: "7px"
}

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
        // TODO: this looks like I just need to not do typos and I can lose this conditional
        if (lessonType === "wordlist") {
            navigator(`wordlist/${level_id}/${lesson.filename}`)
        } else if (lessonType === 'flashcard' || lessonType === 'flashcards') {
            navigator(`flashcards/${lesson.filename}`)
        } else {
            navigator(`story/${lesson.filename}`)
        }
    }

    return (
        <>
            <div style={{ maxWidth: '100vw' }}>
                <div>
                    <h2 className="header">{course?.course_name}</h2>
                </div>
                {course?.course_levels.map((level: any) => (
                    <div key={level.level_id}>
                        <h3>{level.level_name}</h3>
                        <div style={{ overflowY: 'auto' }}>
                            <div style={{ padding: '10px', display: "flex", marginTop: '4px' }}>
                                {level.lessons.map((lesson: any) => (
                                    lesson.type !== 'story' &&
                                    <button
                                        key={lesson.filename}
                                        style={flashCardStyles}
                                        onClick={() => handleSelectStory(lesson.type, lesson, level.level_id)}>
                                        {lesson.name}
                                    </button>
                                ))}
                            </div>
                            <div style={{ padding: '10px', display: "flex", marginTop: '4px' }}>
                                {level.lessons.map((lesson: any) => (
                                    lesson.type === 'story' &&
                                    <button
                                        key={lesson.filename}
                                        style={storyCardStyles}
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

