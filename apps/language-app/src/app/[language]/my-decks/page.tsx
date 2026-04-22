'use client'

import { useParams, useRouter } from "next/navigation";
import { addToDeck, getMyDeck } from "@/hooks/useDecklist";

const MyDecks = () => {
    const { language } = useParams<{ language: string }>();
    const router = useRouter();
    const deck = getMyDeck()

    const handleAdd = (newPhrase: { target_language: string, base_language: string }) => {
        addToDeck(newPhrase)
    }

    return <>
        <button onClick={() => handleAdd({ base_language: "english", target_language: "spanish" })}>add something to my deck</button>
        <div>
            <button
                key={"my-deck"}
                className="flashCardLessonCard"
                onClick={() => router.push(`/${language}/my-decks/myDeck/custom-deck`)}
            >
                {deck.name}
            </button>
        </div>
    </>
}

export default MyDecks;
