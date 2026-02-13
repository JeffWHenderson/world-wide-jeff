import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToDeck } from "../hooks/useDecklist";

type WordListItem = {
    word: string,
    translation: string
}

const WordList = () => {
    const { language, lessonId, section } = useParams();
    const [wordList, setWordList] = useState<WordListItem[]>([])
    // TODO: its the stupidest thing that this is word/translation and everything else is target_language/base_language

    useEffect(() => {
        fetch(`/${language}/modules/${section}/${lessonId}`)
            .then(res => res.json())
            .then(data => { setWordList(data) })
            .catch(err => console.error(err))
    }, [])

    return <>
        <div className="word-list-container">
            <h1>WORDLIST FOR THIS SECTIOIN</h1>
            <h3>click <strong>[+]</strong> to add words you are unfamiliar with to you custom decklist! </h3>
            <br />
            <p>No need to memorize, but this is (Will be) printable so you can reference without a stupid computer</p>

            <ul className="word-list">
                {wordList.map((listItem: WordListItem) => (
                    <div style={{ paddingLeft: '5px', marginBottom: '4px' }}>
                        <div>
                            <div style={{ paddingLeft: '9px' }}>
                                <button style={{ marginRight: '10px' }} onClick={() => addToDeck({ target_language: listItem.translation, base_language: listItem.word }, `${section}-custom-deck`)} >+</button>
                                {listItem.word}  |  {listItem.translation}
                            </div>
                        </div>
                    </div>
                ))}

            </ul>
        </div>
    </>
}

export default WordList;