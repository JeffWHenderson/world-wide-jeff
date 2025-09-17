import { useState } from "react";
import { lessons } from "./LessonList";
// import useLanguage from "./hooks/useLanguage";
import { useNavigate } from "react-router-dom";

const LanguageLearningApp = (language: string = "Spanish") => {
    const [selectedStory, setSelectedStory] = useState<string | undefined>(undefined)
    const lessons = useLessons(language)
    // const navigate = useNavigate();
    // // const [voice] = useLanguage(selectedLanguage)
    // // const [englishVoice] = useLanguage("English")

    // const handleButtonClick = () => {
    //     console.log(selectedLanguage)
    //     navigate("/flashcards", { state: { canPassProps: true } })
    // }

    return (
        <>
            
        </>
        // <>
        //     <div style={{ display: 'flex' }}>
        //         <p>Language Front</p>
        //         <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
        //             <option value="Chinese">Chinese</option>
        //             <option value="Spanish">Spanish</option>
        //             <option value="Japanese">Japanese</option>
        //             <option value="Arabic">Arabic</option>
        //             <option value="English">English</option>
        //         </select>
        //     </div>
        //     <div style={{ display: 'flex' }}>
        //         <p>Read Card Front</p>
        //         <label>
        //             <input
        //                 type="checkbox"
        //                 checked={false}
        //                 onChange={(e) => console.log(e.target)}
        //             />
        //             Autoplay
        //         </label>
        //     </div>
        //     <div style={{ display: 'flex' }}>
        //         <p>Language Back</p>
        //         <select id="auto-play-select" onChange={(e) => setSelectedLanguage(e.target.value)}>
        //             <option value="Chinese">Chinese</option>
        //             <option value="Spanish">Spanish</option>
        //             <option value="Japanese">Japanese</option>
        //             <option value="Arabic">Arabic</option>
        //             <option value="English">English</option>
        //         </select>
        //     </div>
        //     <div style={{ display: 'flex' }}>
        //         <p>Read Card Back</p>
        //         <label>
        //             <input
        //                 type="checkbox"
        //                 checked={false}
        //                 onChange={(e) => console.log(e.target)}
        //             />
        //             Autoplay
        //         </label>
        //     </div>
        //     <div style={{ display: 'flex' }}>
        //         <p>Lesson Number</p>
        //         <select id="lesson-select" onChange={(e) => {
        //             console.log(e.target)
        //         }
        //         }>
        //             {lessons.map((lesson, i) => (
        //                 <option value={i}>{lesson.lessonName}</option>
        //             ))}
        //         </select>
        //     </div>
        //     <div style={{ display: 'flex' }}>
        //         <button onClick={() => handleButtonClick()}>DoTheTHing</button>
        //     </div >
        // </>
    )
}

export default LanguageLearningApp;

