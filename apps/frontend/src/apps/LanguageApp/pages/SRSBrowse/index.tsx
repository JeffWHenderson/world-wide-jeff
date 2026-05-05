import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CardState, isDue, isNew } from "../sm2";
import { loadDeckState, getCardState, resetDeck, SRSDeckState } from "../useSRSStorage";
import "../srs.css";

interface CardLevel {
    front: string;
    back: string;
    romanized?: string;
}

interface Card {
    id: string;
    levels: CardLevel[];
}

interface DeckData {
    id: string;
    name: string;
    cards: Card[];
}

type FilterType = "all" | "new" | "learning" | "due";

// Maps interval to a 1–5 familiarity score (1 = brand new, 5 = well known)
function familiarity(state: CardState): 1 | 2 | 3 | 4 | 5 {
    if (isNew(state)) return 1;
    if (state.interval <= 1) return 2;
    if (state.interval <= 7) return 3;
    if (state.interval <= 30) return 4;
    return 5;
}

const FAM_LABEL: Record<number, string> = {
    1: "New",
    2: "Learning",
    3: "Young",
    4: "Established",
    5: "Mature",
};

const FILTERS: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "learning", label: "Learning" },
    { key: "due", label: "Due" },
];

const LEVEL_NAMES = ["Vocabulary", "Phrase"];

const SRSBrowse = () => {
    const { language, deckId } = useParams<{ language: string; deckId: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = (searchParams.get("filter") ?? "new") as FilterType;

    const [deck, setDeck] = useState<DeckData | null>(null);
    const [deckState, setDeckState] = useState<SRSDeckState>({});

    const handleReset = () => {
        if (!language || !deckId) return;
        if (confirm("Reset all progress for this deck? This cannot be undone.")) {
            resetDeck(language, deckId);
            setDeckState({});
        }
    };

    useEffect(() => {
        if (!language || !deckId) return;
        fetch(`/languages/${language}/${deckId}.json`)
            .then((r) => r.json())
            .then((data: DeckData) => {
                setDeck(data);
                setDeckState(loadDeckState(language, deckId));
            });
    }, [language, deckId]);

    if (!deck) return <div className="srs-container"><p>Loading...</p></div>;

    const activeCards = deck.cards;

    const filteredCards = activeCards.filter((card) => {
        const state = getCardState(deckState, card.id);
        switch (filter) {
            case "new": return isNew(state);
            case "learning": return !isNew(state) && state.interval < 21 && isDue(state);
            case "due": return isDue(state);
            default: return true;
        }
    });

    const countFor = (f: FilterType) => {
        if (f === "all") return activeCards.length;
        return activeCards.filter((card) => {
            const state = getCardState(deckState, card.id);
            if (f === "new") return isNew(state);
            if (f === "learning") return !isNew(state) && state.interval < 21 && isDue(state);
            if (f === "due") return isDue(state);
            return true;
        }).length;
    };

    return (
        <div className="srs-container">
            <div className="srs-browse-header">
                <button className="srs-page-back" onClick={() => navigate(`/language-app/${language}`)}>
                    ← {deck.name}
                </button>
                <button className="srs-btn-reset" onClick={handleReset}>Reset deck</button>
            </div>

            <div className="srs-browse-filters">
                {FILTERS.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`srs-browse-filter-btn ${filter === key ? "active" : ""}`}
                        onClick={() => setSearchParams({ filter: key })}
                    >
                        {label}
                        <span className="srs-browse-filter-count">{countFor(key)}</span>
                    </button>
                ))}
            </div>

            <div className="srs-browse-list">
                {filteredCards.length === 0 && (
                    <p className="srs-empty">No cards in this category.</p>
                )}
                {filteredCards.map((card) => {
                    const state = getCardState(deckState, card.id);
                    const fam = familiarity(state);
                    const levelIdx = Math.min(state.level, card.levels.length - 1);
                    const level = card.levels[levelIdx];
                    const levelName = LEVEL_NAMES[levelIdx] ?? `Level ${levelIdx + 1}`;
                    return (
                        <div key={card.id} className="srs-browse-row">
                            <div className="srs-browse-text">
                                <div className="srs-browse-front">{level.front}</div>
                                <div className="srs-browse-back">{level.back}</div>
                                {level.romanized && (
                                    <div className="srs-browse-romanized">{level.romanized}</div>
                                )}
                            </div>
                            <div className="srs-browse-meta">
                                <span className="srs-level-badge" style={{ fontSize: "0.62rem" }}>{levelName}</span>
                                <span className={`srs-fam srs-fam-${fam}`} title={FAM_LABEL[fam]}>
                                    {fam}
                                </span>
                                {!isNew(state) && (
                                    <span className="srs-browse-interval">{state.interval}d</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SRSBrowse;
