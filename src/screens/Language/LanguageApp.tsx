import { useState } from "react";
import Conversation from "./Conversation";

const lessonOneDTO = {
    lessonName: "Introductions",
    lessonNotes: "this lesson is to help you with your first conversation",
    Spanish: [
        "hola",
        "hello",
        "adios"
    ],
    English: [
        "hi",
        "what's up",
        "goodbye"
    ]
}

const LanguageLearningApp = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Spanish")
    const [lessons] = useState([{ name: "Lesson 1" }, { name: "Lesson 2" }])

    return (
        <>
            <h2>Learning in {selectedLanguage}</h2>

            <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
            </select>

            <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
                {lessons.map(lesson => (
                    <option value="Chinese">{lesson.name}</option>
                ))}
            </select>



            <Conversation lessonDTO={lessonOneDTO}></Conversation>
        </>
    )
}

export default LanguageLearningApp;

