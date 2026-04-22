'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { addToDeck } from "@/hooks/useDecklist";
import { buildPrintableFlashcards } from "@/hooks/print";
import { WordListItem } from "@/types/WordListTypes";
import '@/styles/wordList.css';

const WordList = () => {
    const { language, lessonId, section } = useParams<{ language: string; lessonId: string; section: string }>();
    const [wordList, setWordList] = useState<WordListItem[]>([])

    useEffect(() => {
        fetch(`/${language}/modules/${section}/${lessonId}.json`)
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
                <div style={{ marginLeft: '10px' }}>this is printable so you can reference without a stupid computer</div>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>{language}</th>
                    </tr>
                </thead>
                <tbody>
                    {wordList.map((listItem: WordListItem, i: number) => (
                        <tr key={i}>
                            <td style={{ border: '1px solid black' }}>
                                <button style={{ marginRight: '10px' }} onClick={() => addToDeck(listItem, `${section}-custom-deck`)}>+</button>
                                {listItem.base_language}
                            </td>
                            <td style={{ textAlign: 'center', border: '1px solid black', padding: '3px' }}>{listItem.target_language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default WordList;
