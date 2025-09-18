// import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LanguageLearningApp = () => {
    // const [selectedStory, setSelectedStory] = useState<string | undefined>(undefined)
    const navigator = useNavigate()

    function handleSelectStory(e: MouseEvent) {
        console.log(e.target)
        navigator(`12345`)
    }

    return (
        <>
            <div>
                <button onClick={(e) => handleSelectStory(e)} >go to lesson</button>
                <p>ok, this page will be a bunch of lesson options on a carousel organized by leaning level</p>
            </div>
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

