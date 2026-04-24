import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadDeckState, getDeckSummary, resetDeck } from "./useSRSStorage";
import "./srs.css";

interface DeckMeta {
    id: string;
    name: string;
    language: string;
    cards: { id: string; levels: unknown[] }[];
}

const AVAILABLE_DECKS = [
    "everyday_phrases",
    "food_and_drink",
    "common_places",
    "jobs_and_hobbies",
    "moods_and_emotion",
    "human_body",
];

const SRSHome = () => {
    const { language } = useParams<{ language: string }>();
    const navigate = useNavigate();
    const [deckMetas, setDeckMetas] = useState<DeckMeta[]>([]);

    useEffect(() => {
        if (!language) return;
        Promise.all(
            AVAILABLE_DECKS.map((deckId) =>
                fetch(`/srs/${language}/${deckId}.json`)
                    .then((r) => r.json())
                    .catch(() => null)
            )
        ).then((results) => {
            setDeckMetas(results.filter(Boolean) as DeckMeta[]);
        });
    }, [language]);

    const handleReset = (deckId: string) => {
        if (!language) return;
        if (confirm("Reset all progress for this deck? This cannot be undone.")) {
            resetDeck(language, deckId);
            // Re-trigger summary refresh
            setDeckMetas((prev) => [...prev]);
        }
    };

    return (
        <div className="srs-container">
            <div className="srs-home-header">
                <h2>Spaced Repetition Decks</h2>
                <p className="srs-lang-label">{language}</p>
            </div>

            <div className="srs-deck-list">
                {deckMetas.length === 0 && <p>Loading decks...</p>}
                {deckMetas.map((deck) => {
                    const state = loadDeckState(language!, deck.id);
                    const cardIds = deck.cards.map((c) => c.id);
                    const summary = getDeckSummary(cardIds, state);
                    const totalDue = summary.newCount + summary.dueCount + summary.learnCount;

                    return (
                        <div key={deck.id} className="srs-deck-card">
                            <div className="srs-deck-info">
                                <div className="srs-deck-title">{deck.name}</div>
                                <div className="srs-deck-counts">
                                    <span className="srs-count new">{summary.newCount} new</span>
                                    <span className="srs-count learn">{summary.learnCount} learning</span>
                                    <span className="srs-count review">{summary.dueCount} due</span>
                                </div>
                            </div>
                            <div className="srs-deck-actions">
                                <button
                                    className="srs-btn-primary"
                                    disabled={totalDue === 0}
                                    onClick={() => navigate(`/language-app/${language}/srs/${deck.id}`)}
                                >
                                    {totalDue > 0 ? `Study (${totalDue})` : "Nothing due"}
                                </button>
                                <button
                                    className="srs-btn-reset"
                                    onClick={() => handleReset(deck.id)}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="srs-how-it-works">
                <h3>How it works</h3>
                <ul>
                    <li><strong>Again</strong> — you forgot. Card comes back in this session.</li>
                    <li><strong>Hard</strong> — correct but difficult. Short interval.</li>
                    <li><strong>Good</strong> — correct with normal effort. Standard interval.</li>
                    <li><strong>Easy</strong> — recalled instantly. Longer interval.</li>
                </ul>
                <p>Cards you know well are shown less often. Cards you struggle with come back sooner. Progress is saved in your browser.</p>
            </div>
        </div>
    );
};

export default SRSHome;
