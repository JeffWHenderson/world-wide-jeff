import { useNavigate } from 'react-router-dom';

const lesson = {
    sentences: { targetLanguage: "Hola todo el mundo.", baseLanguage: "Hello World." }
}


const StoryReader = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page in the history stack
    };


    return <>
        <button onClick={() => handleGoBack()} >go back</button >
        <p>{lesson.sentences.targetLanguage}</p>
        <p>{lesson.sentences.baseLanguage}</p>
    </>
}



export default StoryReader