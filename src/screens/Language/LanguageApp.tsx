import { useState } from "react";
import Conversation from "./Conversation";

const LanguageLearningApp = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Spanish")
    // const [lessonNumber, setLessonNumber] = useState(1)

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

            <Conversation></Conversation>
        </>
    )
}

export default LanguageLearningApp;

