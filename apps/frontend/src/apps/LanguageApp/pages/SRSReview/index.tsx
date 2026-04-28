import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyRating, CardState, isDue, isNew, levelUpState, LEVEL_UP_REPS, Rating } from "../sm2";
import { useLanguageApp } from "../../LanguageAppContext";
import {
    loadDeckState,
    saveDeckState,
    getCardState,
    updateCardState,
    SRSDeckState,
} from "../useSRSStorage";
import useLanguage from "../../hooks/useLanguage";
import SRSSettings from "../components/SRSSettings";
import "../srs.css";

interface CardLevel {
    front: string;
    back: string;
    romanized?: string;
    grammarNote?: string;
    literal?: string;
}

interface Card {
    id: string;
    levels: CardLevel[];
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
    return session;
}

function currentLevel(card: Card & { cardState: CardState }): CardLevel {
    const idx = Math.min(card.cardState.level, card.levels.length - 1);
    return card.levels[idx];
}

function hasNextLevel(card: SessionCard): boolean {
    return card.cardState.level < card.levels.length - 1;
}

const LEVEL_NAMES = ["Vocabulary", "Phrase"];


const SRSReview = () => {
    const { language, deckId } = useParams<{ language: string; deckId: string }>();
    const navigate = useNavigate();

    const [deck, setDeck] = useState<DeckData | null>(null);
    const [deckState, setDeckState] = useState<SRSDeckState>({});
    const [session, setSession] = useState<SessionCard[]>([]);
    const [currentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { ttsEnabled, autoplay, volume, showLiteral } = useLanguageApp();
    const [done, setDone] = useState(false);
    const [totalCards, setTotalCards] = useState(0);
    const [reviewed, setReviewed] = useState(0);
    const [levelUpCard, setLevelUpCard] = useState<SessionCard | null>(null);
    const [noteOpen, setNoteOpen] = useState(false);

    // Autoplay state
    const [autoplayIndex, setAutoplayIndex] = useState(0);
    const autoplayRef = useRef(false);
    const autoplayIndexRef = useRef(0);

    const { targetVoice, baseVoice } = useLanguage({ targetLanguage: language ?? "english" });

    // Returns the utterance so callers can attach onend
    const buildUtt = useCallback((text: string, isTarget: boolean): SpeechSynthesisUtterance => {
        const utt = new SpeechSynthesisUtterance(text.replace(/\(.*?\)/g, ""));
        utt.voice = (isTarget ? targetVoice : baseVoice) ?? null;
        utt.rate = 0.9;
        utt.volume = volume;
        return utt;
    }, [targetVoice, baseVoice, volume]);

    const speak = (text: string, isTarget: boolean) => {
        if (!ttsEnabled) return;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(buildUtt(text, isTarget));
    };

    useEffect(() => {
        if (!language || !deckId) return;
        fetch(`/languages/${language}/${deckId}.json`)
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

    // ── Autoplay loop ──────────────────────────────────────────────────────────
    useEffect(() => {
        autoplayRef.current = autoplay;
    }, [autoplay]);

    useEffect(() => {
        autoplayIndexRef.current = autoplayIndex;
    }, [autoplayIndex]);

    useEffect(() => {
        if (!autoplay || !deck) return;

        window.speechSynthesis.cancel();

        const allCards = deck.cards;
        const idx = autoplayIndex % allCards.length;
        const card = allCards[idx];
        const level = card.levels[0]; // always show level 0 in autoplay

        // Phase 1: speak front (English)
        setIsFlipped(false);

        const frontUtt = buildUtt(level.front, false);
        const FALLBACK_MS = 4000;

        let frontTimer: ReturnType<typeof setTimeout>;
        let backTimer: ReturnType<typeof setTimeout>;
        let advanceTimer: ReturnType<typeof setTimeout>;

        const speakBack = () => {
            if (!autoplayRef.current) return;
            setIsFlipped(true);
            const backUtt = buildUtt(level.back, true);

            const advance = () => {
                if (!autoplayRef.current) return;
                // brief pause then next card
                advanceTimer = setTimeout(() => {
                    if (!autoplayRef.current) return;
                    setAutoplayIndex((i) => i + 1);
                    setIsFlipped(false);
                }, 1200);
            };

            backUtt.onend = advance;
            window.speechSynthesis.speak(backUtt);
            backTimer = setTimeout(advance, FALLBACK_MS + level.back.length * 80);
        };

        frontUtt.onend = () => {
            clearTimeout(frontTimer);
            if (!autoplayRef.current) return;
            // pause between front and back
            frontTimer = setTimeout(speakBack, 600);
        };

        window.speechSynthesis.speak(frontUtt);
        frontTimer = setTimeout(speakBack, FALLBACK_MS + level.front.length * 80);

        return () => {
            clearTimeout(frontTimer);
            clearTimeout(backTimer);
            clearTimeout(advanceTimer);
            window.speechSynthesis.cancel();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay, autoplayIndex, deck]);

    // Stop speech when autoplay turns off
    useEffect(() => {
        if (!autoplay) {
            window.speechSynthesis.cancel();
            setIsFlipped(false);
        }
    }, [autoplay]);
    // ──────────────────────────────────────────────────────────────────────────

    const currentCard = session[currentIndex];

    const flip = () => {
        setIsFlipped(true);
        setNoteOpen(false);
        if (currentCard) speak(currentLevel(currentCard).back, true);
    };

    const advanceSession = (
        nextSession: SessionCard[],
        updatedDeckState: SRSDeckState
    ) => {
        setSession(nextSession);
        setDeckState(updatedDeckState);
        if (language && deckId) saveDeckState(language, deckId, updatedDeckState);
        setIsFlipped(false);
        setNoteOpen(false);
        if (nextSession.length === 0) setDone(true);
    };

    const rate = (rating: Rating) => {
        if (!deck || !currentCard || !language || !deckId) return;

        const newState = applyRating(currentCard.cardState, rating);
        setReviewed((r) => r + 1);

        const willLevelUp =
            rating >= 3 &&
            newState.repetitions >= LEVEL_UP_REPS &&
            hasNextLevel(currentCard);

        if (rating === 1) {
            const updatedCard: SessionCard = { ...currentCard, cardState: newState, isAgain: true };
            const next = [...session];
            next.splice(currentIndex, 1);
            const insertAt = Math.min(currentIndex + 4, next.length);
            next.splice(insertAt, 0, updatedCard);
            setTotalCards((t) => t + 1);
            const updated = updateCardState(deckState, currentCard.id, newState);
            advanceSession(next, updated);
        } else if (willLevelUp) {
            const leveledState = levelUpState(newState);
            const updated = updateCardState(deckState, currentCard.id, leveledState);
            saveDeckState(language, deckId, updated);
            setDeckState(updated);
            setLevelUpCard({ ...currentCard, cardState: leveledState });
            const next = [...session];
            next.splice(currentIndex, 1);
            setSession(next);
        } else {
            const next = [...session];
            next.splice(currentIndex, 1);
            const updated = updateCardState(deckState, currentCard.id, newState);
            advanceSession(next, updated);
        }
    };

    const dismissLevelUp = () => {
        setLevelUpCard(null);
        setIsFlipped(false);
        if (session.length === 0) setDone(true);
    };

    const cardSrpLabel = (state: CardState): string => {
        if (isNew(state)) return "New";
        if (state.interval < 21) return "Learning";
        return `Review (${state.interval}d)`;
    };

    const remaining = session.length;

    if (!deck) {
        return <div className="srs-container"><p>Loading...</p></div>;
    }

    // ── Autoplay view ──────────────────────────────────────────────────────────
    if (autoplay) {
        const idx = autoplayIndex % deck.cards.length;
        const card = deck.cards[idx];
        const level = card.levels[0];
        return (
            <div className="srs-container">
                <div className="srs-header">
                    <button className="srs-back-link" onClick={() => navigate(`/language-app/${language}`)}>
                        ← Decks
                    </button>
                    <span className="srs-deck-name">{deck.name}</span>
                    <SRSSettings />
                </div>

                <div className="srs-card-wrap">
                    <div className={`srs-card ${isFlipped ? "flipped" : ""}`}>
                        <div className="srs-card-front">
                            <div className="srs-card-meta-row">
                                <span className="srs-level-badge">Autoplay</span>
                            </div>
                            <div className="srs-card-text">{level.front}</div>
                        </div>
                        <div className="srs-card-back">
                            <div className="srs-card-meta-row">
                                <span className="srs-level-badge">Autoplay</span>
                            </div>
                            <div className="srs-card-text front-dim">{level.front}</div>
                            <hr className="srs-divider" />
                            <div className="srs-card-text">{level.back}</div>
                            {level.romanized && (
                                <div className="srs-romanized">{level.romanized}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="srs-autoplay-indicator">
                    <div className="srs-autoplay-dot" />
                    <span>Listening… {(idx + 1)} / {deck.cards.length}</span>
                </div>
            </div>
        );
    }
    // ──────────────────────────────────────────────────────────────────────────

    // Level-up banner
    if (levelUpCard) {
        const nextLevelName = LEVEL_NAMES[levelUpCard.cardState.level] ?? "Next Level";
        const prevLevel = levelUpCard.levels[levelUpCard.cardState.level - 1];
        const nextLevelContent = currentLevel(levelUpCard);
        return (
            <div className="srs-container">
                <div className="srs-levelup-banner">
                    <div className="srs-levelup-icon">⬆</div>
                    <h2 className="srs-levelup-title">Level Up!</h2>
                    <p className="srs-levelup-sub">
                        You've mastered the <strong>{LEVEL_NAMES[levelUpCard.cardState.level - 1] ?? "word"}</strong> level.
                    </p>
                    <div className="srs-levelup-transition">
                        <div className="srs-levelup-old">
                            <span className="srs-levelup-badge old">{LEVEL_NAMES[levelUpCard.cardState.level - 1]}</span>
                            <div>{prevLevel?.front}</div>
                            <div className="srs-levelup-arrow-text">{prevLevel?.back}</div>
                        </div>
                        <div className="srs-levelup-arrow">→</div>
                        <div className="srs-levelup-new">
                            <span className="srs-levelup-badge new">{nextLevelName}</span>
                            <div>{nextLevelContent.front}</div>
                            <div className="srs-levelup-arrow-text">{nextLevelContent.back}</div>
                        </div>
                    </div>
                    <button className="srs-btn-primary" onClick={dismissLevelUp}>Continue</button>
                </div>
            </div>
        );
    }

    if (done || remaining === 0) {
        return (
            <div className="srs-container">
                <div className="srs-done">
                    <h2>Session complete!</h2>
                    <p>You reviewed {reviewed} card{reviewed !== 1 ? "s" : ""}.</p>
                    <p>Come back tomorrow to review cards that are due.</p>
                    <div className="srs-done-actions">
                        <button className="srs-btn-primary" onClick={() => navigate(`/language-app/${language}`)}>
                            Back to Decks
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const level = currentLevel(currentCard);
    const levelName = LEVEL_NAMES[currentCard.cardState.level] ?? `Level ${currentCard.cardState.level + 1}`;

    return (
        <div className="srs-container">
            <div className="srs-header">
                <button className="srs-back-link" onClick={() => navigate(`/language-app/${language}`)}>
                    ← Decks
                </button>
                <span className="srs-deck-name">{deck.name}</span>
                <SRSSettings />
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
                        <div className="srs-card-meta-row">
                            <span className="srs-level-badge">{levelName}</span>
                            <span className="srs-card-label">{cardSrpLabel(currentCard.cardState)}</span>
                        </div>
                        <div className="srs-card-text">{level.front}</div>
                        {!isFlipped && <div className="srs-tap-hint">tap to reveal</div>}
                    </div>
                    <div className="srs-card-back">
                        <div className="srs-card-meta-row">
                            <span className="srs-level-badge">{levelName}</span>
                            <span className="srs-card-label">{cardSrpLabel(currentCard.cardState)}</span>
                        </div>
                        <div className="srs-card-text front-dim">{level.front}</div>
                        <hr className="srs-divider" />
                        <div className="srs-card-text">{level.back}</div>
                        {level.romanized && (
                            <div className="srs-romanized">{level.romanized}</div>
                        )}
                        {showLiteral && level.literal && (
                            <div className="srs-literal">{level.literal}</div>
                        )}
                        {hasNextLevel(currentCard) && (
                            <div className="srs-levelup-hint">
                                {LEVEL_UP_REPS - currentCard.cardState.repetitions > 0
                                    ? `${LEVEL_UP_REPS - currentCard.cardState.repetitions} good review${LEVEL_UP_REPS - currentCard.cardState.repetitions !== 1 ? "s" : ""} to unlock phrase`
                                    : "Phrase unlocks on Good or Easy!"}
                            </div>
                        )}
                        {level.grammarNote && (
                            <div className="srs-grammar-note-wrap" onClick={e => e.stopPropagation()}>
                                <button
                                    className="srs-grammar-note-toggle"
                                    onClick={() => setNoteOpen(o => !o)}
                                >
                                    Grammar note {noteOpen ? "▴" : "▾"}
                                </button>
                                {noteOpen && (
                                    <div className="srs-grammar-note-body">{level.grammarNote}</div>
                                )}
                            </div>
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
                        <span className="rating-interval">1d</span>
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
