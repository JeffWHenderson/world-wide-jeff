// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lessons, Lesson } from "./components/Lessons/LessonList"



const LanguageLearningApp = () => {
    // const [selectedStory, setSelectedStory] = useState<string | undefined>(undefined)
    const navigator = useNavigate()

    function handleSelectStory(lessonType: string, lesson?: Lesson) {
        if (lessonType === 'flashcard') {
            navigator(`flashcards/${lesson?.lessonName}`)
        } else {
            navigator(`story/${lesson?.lessonName || '12345'}`)
        }
    }

    return (
        <>
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
                <button style={{ backgroundColor: 'red' }} onClick={() => handleSelectStory('story')} >{"story-mode"}</button>
            </div>
        </>
    )
}

export default LanguageLearningApp;

