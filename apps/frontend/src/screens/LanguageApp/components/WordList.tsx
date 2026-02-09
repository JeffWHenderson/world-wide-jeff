import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type WordListItem = {
    word: string,
    translation: string
}

const WordList = () => {
    const { language, lessonId, section } = useParams();
    const [wordList, setWordList] = useState<WordListItem[]>([])

    useEffect(() => {
        fetch(`/${language}/modules/${section}/${lessonId}`)
            .then(res => res.json())
            .then(data => { console.log(data), setWordList(data) })
            .catch(err => console.error(err))
    }, [])

    return <>
        <div className="word-list-container">
            <h1>WORDLIST FOR THIS SECTIOIN</h1>
            <h3>No need to memorize now, but this is printable so you can reference without a stupid computer</h3>

            <ul className="word-list">
                {wordList.map((listItem: WordListItem) => (
                    <li><pre>{listItem.word}  |  {listItem.translation}</pre></li>
                ))}
            </ul>
        </div>
    </>
}

export default WordList;