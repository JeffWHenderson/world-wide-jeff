import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyRating, CardState, isDue, isNew, Rating } from "./sm2";
import {
    loadDeckState,
    saveDeckState,
    getCardState,
    updateCardState,
    SRSDeckState,
} from "./useSRSStorage";
import "./srs.css";
import useLanguage from "../../hooks/useLanguage";

interface Card {
    id: string;
    front: string;
    back: string;
    romanized?: string;
}

interface DeckData {
    id: string;
    name: string;
    language: string;
    cards: Card[];
}

type SessionCard = Card & { cardState: CardState; isAgain?: boolean };

function buildSession(cards: Card[], deckState: SRSDeckState): SessionCard[] {
    const session: SessionCard[] = [];
    for (const card of cards) {
        const state = getCardState(deckState, card.id);
        if (isNew(state) || isDue(state)) {
            session.push({ ...card, cardState: state });
        }
    }
    // New cards first, then due, then again cards are appended dynamically
    return session;
}

const SRSReview = () => {
    const { language, deckId } = useParams<{ language: string; deckId: string }>();
    const navigate = useNavigate();

    const [deck, setDeck] = useState<DeckData | null>(null);
    const [deckState, setDeckState] = useState<SRSDeckState>({});
    const [session, setSession] = useState<SessionCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [done, setDone] = useState(false);
    const [totalCards, setTotalCards] = useState(0);
    const [reviewed, setReviewed] = useState(0);
    const [voice] = useLanguage(language as string)
    const [englishVoice] = useLanguage("english")

    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

    // Load voices — browser fires voiceschanged once they're available
    useEffect(() => {
        const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
        load();
        window.speechSynthesis.onvoiceschanged = load;
        return () => { window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const getVoice = (lang: string): SpeechSynthesisVoice | undefined => {
        const voices = voicesRef.current;
        if (lang === "english") {
            return voices.find(v => v.name.toLowerCase() === "samantha")
                ?? voices.find(v => v.lang.startsWith("en-"));
        }
        if (lang === "spanish") {
            return voices.find(v => v.name.toLowerCase() === "paulina")
                ?? voices.find(v => v.lang.startsWith("es-"));
        }
        if (lang === "chinese") {
            return voices.find(v => ["ting-ting", "tingting"].includes(v.name.toLowerCase()))
                ?? voices.find(v => v.lang.startsWith("zh-"));
        }
    };

    const speak = (text: string, isTarget: boolean) => {
        if (!ttsEnabled) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text.replace(/\(.*?\)/g, ""));
        console.log('hello world')
        // console.log(getVoice('english'))
        // console.log(voice)
        // console.log(englishVoice)
        utt.voice = getVoice(isTarget ? (language ?? "english") : "english") ?? null;
        utt.rate = 0.9;
        utt.volume = 1
        console.log(utt.voice)
        console.log(utt)
        window.speechSynthesis.speak(utt);
    };

    // Load deck data and SRS state
    useEffect(() => {
        if (!language || !deckId) return;
        fetch(`/srs/${language}/${deckId}.json`)
            .then((r) => r.json())
            .then((data: DeckData) => {
                setDeck(data);
                const state = loadDeckState(language, deckId);
                setDeckState(state);
                const s = buildSession(data.cards, state);
                setSession(s);
                setTotalCards(s.length);
            })
            .catch((e) => console.error(e));
    }, [language, deckId]);

    const currentCard = session[currentIndex];

    const flip = () => {
        setIsFlipped(true);
        if (currentCard) speak(currentCard.back, true);
    };

    const rate = (rating: Rating) => {
        if (!deck || !currentCard || !language || !deckId) return;

        const newState = applyRating(currentCard.cardState, rating);
        const updatedDeckState = updateCardState(deckState, currentCard.id, newState);
        setDeckState(updatedDeckState);
        saveDeckState(language, deckId, updatedDeckState);

        setReviewed((r) => r + 1);

        if (rating === 1) {
            // Push to end of session for re-review today
            const againCard: SessionCard = { ...currentCard, cardState: newState, isAgain: true };
            const nextSession = [...session];
            nextSession.splice(currentIndex, 1);
            // Insert again card ~4 positions ahead (or at end)
            const insertAt = Math.min(currentIndex + 4, nextSession.length);
            nextSession.splice(insertAt, 0, againCard);
            setSession(nextSession);
            setTotalCards((t) => t + 1);
            // currentIndex stays the same — next card slides in
            if (nextSession.length === 0) {
                setDone(true);
            } else {
                setIsFlipped(false);
            }
        } else {
            const nextSession = [...session];
            nextSession.splice(currentIndex, 1);
            setSession(nextSession);
            if (nextSession.length === 0 || currentIndex >= nextSession.length) {
                if (nextSession.length === 0) {
                    setDone(true);
                } else {
                    setCurrentIndex(0);
                    setIsFlipped(false);
                }
            } else {
                setIsFlipped(false);
            }
        }
    };

    const cardLabel = (state: CardState): string => {
        if (isNew(state)) return "New";
        if (state.interval < 21) return "Learning";
        return `Review (${state.interval}d)`;
    };

    const remaining = session.length;

    if (!deck) {
        return <div className="srs-container"><p>Loading...</p></div>;
    }

    if (done || remaining === 0) {
        return (
            <div className="srs-container">
                <div className="srs-done">
                    <h2>Session complete!</h2>
                    <p>You reviewed {reviewed} card{reviewed !== 1 ? "s" : ""}.</p>
                    <p>Come back tomorrow to review cards that are due.</p>
                    <div className="srs-done-actions">
                        <button className="srs-btn-primary" onClick={() => navigate(`/language-app/${language}/srs`)}>
                            Back to Decks
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="srs-container">
            <div className="srs-header">
                <button className="srs-back-link" onClick={() => navigate(`/language-app/${language}/srs`)}>
                    ← Decks
                </button>
                <span className="srs-deck-name">{deck.name}</span>
                <button
                    className={`srs-tts-toggle ${ttsEnabled ? "active" : ""}`}
                    onClick={() => setTtsEnabled((v) => !v)}
                    title="Toggle text-to-speech"
                >
                    {ttsEnabled ? "🔊" : "🔇"}
                </button>
            </div>

            <div className="srs-progress-bar-wrap">
                <div
                    className="srs-progress-bar-fill"
                    style={{ width: `${totalCards > 0 ? ((totalCards - remaining) / totalCards) * 100 : 0}%` }}
                />
            </div>
            <div className="srs-count-row">
                <span className="srs-count new">{session.filter((c) => isNew(c.cardState)).length} new</span>
                <span className="srs-count learn">{session.filter((c) => !isNew(c.cardState) && c.isAgain).length} learning</span>
                <span className="srs-count review">{remaining} remaining</span>
            </div>

            <div className="srs-card-wrap">
                <div className={`srs-card ${isFlipped ? "flipped" : ""}`} onClick={!isFlipped ? flip : undefined}>
                    <div className="srs-card-front">
                        <div className="srs-card-label">{cardLabel(currentCard.cardState)}</div>
                        <div className="srs-card-text">{currentCard.front}</div>
                        {!isFlipped && (
                            <div className="srs-tap-hint">tap to reveal</div>
                        )}
                    </div>
                    <div className="srs-card-back">
                        <div className="srs-card-label">{cardLabel(currentCard.cardState)}</div>
                        <div className="srs-card-text front-dim">{currentCard.front}</div>
                        <hr className="srs-divider" />
                        <div className="srs-card-text">{currentCard.back}</div>
                        {currentCard.romanized && (
                            <div className="srs-romanized">{currentCard.romanized}</div>
                        )}
                    </div>
                </div>
            </div>

            {isFlipped ? (
                <div className="srs-rating-row">
                    <button className="srs-rating again" onClick={() => rate(1)}>
                        <span className="rating-label">Again</span>
                        <span className="rating-interval">&lt;1d</span>
                    </button>
                    <button className="srs-rating hard" onClick={() => rate(2)}>
                        <span className="rating-label">Hard</span>
                        <span className="rating-interval">~{Math.round((currentCard.cardState.interval || 1) * 1.2)}d</span>
                    </button>
                    <button className="srs-rating good" onClick={() => rate(3)}>
                        <span className="rating-label">Good</span>
                        <span className="rating-interval">
                            {currentCard.cardState.repetitions === 0 ? "1d" : `~${Math.round((currentCard.cardState.interval || 1) * currentCard.cardState.easeFactor)}d`}
                        </span>
                    </button>
                    <button className="srs-rating easy" onClick={() => rate(4)}>
                        <span className="rating-label">Easy</span>
                        <span className="rating-interval">
                            {currentCard.cardState.repetitions === 0 ? "4d" : `~${Math.round((currentCard.cardState.interval || 1) * currentCard.cardState.easeFactor * 1.3)}d`}
                        </span>
                    </button>
                </div>
            ) : (
                <div className="srs-flip-hint">
                    <button className="srs-show-answer" onClick={flip}>Show Answer</button>
                </div>
            )}
        </div>
    );
};

export default SRSReview;
