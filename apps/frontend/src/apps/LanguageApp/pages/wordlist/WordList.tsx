import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToDeck } from "../../hooks/useDecklist";
import { buildPrintableFlashcards } from "../../hooks/print";

export type WordListItem = {
    base_language: string,
    target_language: string
}

const WordList = () => {
    const { language, lessonId, section } = useParams();
    const [wordList, setWordList] = useState<WordListItem[]>([])

    useEffect(() => {
        fetch(`/${language}/modules/${section}/${lessonId}`)
            .then(res => res.json())
            .then(data => { setWordList(data) })
            .catch(err => console.error(err))
    }, [])

    return <>
        <div className="word-list-container">
            <h1>WORDLIST FOR THIS SECTIOIN</h1>
            <h2>click <strong>[+]</strong> to add words you are unfamiliar with to you custom decklist</h2>
            <div style={{ display: 'flex' }}>
                <button onClick={() => buildPrintableFlashcards(wordList)}>Print Flashcards</button>
                <div style={{ marginLeft: '10px' }}> this is printable so you can reference without a stupid computer</div>
            </div>
            <br />
            <ul className="word-list">
                {wordList.map((listItem: WordListItem) => (
                    <div style={{ marginBottom: '4px' }}>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <button style={{ marginRight: '10px' }} onClick={() => addToDeck(listItem, `${section}-custom-deck`)} >+</button>
                                <pre><strong>{listItem.base_language}</strong>  |  <strong>{listItem.target_language}</strong></pre>
                            </div>
                        </div>
                    </div>
                ))}

            </ul>
        </div>
    </>
}

export default WordList;