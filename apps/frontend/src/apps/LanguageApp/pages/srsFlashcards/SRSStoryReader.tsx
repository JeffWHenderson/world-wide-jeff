import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadDeckState, getCardState } from "./useSRSStorage";
import { isNew, CardState } from "./sm2";
import { useLanguageApp } from "../../LanguageAppContext";
import SRSSettings from "./SRSSettings";
import "./srs.css";

interface StoryToken {
    text: string;
    cardId?: string | null;
    translation?: string;
}

interface StorySentence {
    base_language: string;
    target_language: string;
    tokens: StoryToken[];
}

interface StoryData {
    id: string;
    name: string;
    sentences: StorySentence[];
}

type TokenStatus = "new" | "learning" | "mature";

function getTokenStatus(cardId: string | null | undefined, deckState: Record<string, CardState>): TokenStatus | null {
    if (!cardId) return null;
    const state = getCardState(deckState, cardId);
    if (isNew(state)) return "new";
    if (state.interval < 21) return "learning";
    return "mature";
}

const STATUS_LABEL: Record<TokenStatus, string> = {
    new: "New",
    learning: "Learning",
    mature: "Mature",
};

interface ActiveWord {
    text: string;
    translation: string;
    status: TokenStatus | null;
}

const SRSStoryReader = () => {
    const { language, deckId, storyId } = useParams<{ language: string; deckId: string; storyId: string }>();
    const navigate = useNavigate();

    const [story, setStory] = useState<StoryData | null>(null);
    const [deckState, setDeckState] = useState<Record<string, CardState>>({});
    const [activeWord, setActiveWord] = useState<ActiveWord | null>(null);
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speakingRate, setSpeakingRate] = useState(0.9);

    const { volume } = useLanguageApp();
    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
    const playingRef = useRef(false);

    useEffect(() => {
        const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
        load();
        window.speechSynthesis.onvoiceschanged = load;
        return () => { window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    useEffect(() => {
        if (!language || !deckId || !storyId) return;
        fetch(`/srs/${language}/${deckId}/stories/${storyId}.json`)
            .then(r => r.json())
            .then(data => setStory(data))
            .catch(console.error);
        setDeckState(loadDeckState(language, deckId));
    }, [language, deckId, storyId]);

    const getVoice = (): SpeechSynthesisVoice | null => {
        const voices = voicesRef.current;
        if (language === "spanish") {
            return voices.find(v => v.name.toLowerCase() === "paulina")
                ?? voices.find(v => v.lang.startsWith("es-"))
                ?? null;
        }
        if (language === "japanese") {
            return voices.find(v => v.name.toLowerCase() === "kyoko")
                ?? voices.find(v => v.lang.startsWith("ja-"))
                ?? null;
        }
        if (language === "chinese") {
            return voices.find(v => ["ting-ting", "tingting"].includes(v.name.toLowerCase()))
                ?? voices.find(v => v.lang.startsWith("zh-"))
                ?? null;
        }
        return voices.find(v => v.lang.startsWith("en-")) ?? null;
    };

    const speakSentence = (idx: number, continueAfter = false) => {
        if (!story || idx >= story.sentences.length) {
            setPlayingIndex(-1);
            setIsPlaying(false);
            playingRef.current = false;
            return;
        }
        const utt = new SpeechSynthesisUtterance(story.sentences[idx].target_language);
        utt.voice = getVoice();
        utt.rate = speakingRate;
        utt.volume = volume;
        setPlayingIndex(idx);
        utt.onend = () => {
            if (continueAfter && playingRef.current) {
                setTimeout(() => speakSentence(idx + 1, true), 700);
            } else {
                setPlayingIndex(-1);
                setIsPlaying(false);
                playingRef.current = false;
            }
        };
        window.speechSynthesis.speak(utt);
    };

    const handlePlayAll = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            playingRef.current = false;
            setIsPlaying(false);
            setPlayingIndex(-1);
        } else {
            playingRef.current = true;
            setIsPlaying(true);
            const from = playingIndex >= 0 ? playingIndex : 0;
            speakSentence(from, true);
        }
    };

    const handleSentenceClick = (idx: number) => {
        window.speechSynthesis.cancel();
        playingRef.current = false;
        setIsPlaying(false);
        speakSentence(idx);
    };

    const handleTokenClick = (e: React.MouseEvent, token: StoryToken) => {
        e.stopPropagation();
        if (!token.translation) return;
        const status = getTokenStatus(token.cardId, deckState);
        setActiveWord({ text: token.text, translation: token.translation, status });
    };

    const handleBack = () => {
        window.speechSynthesis.cancel();
        navigate(-1);
    };

    if (!story) return <div className="srs-container"><p>Loading...</p></div>;

    return (
        <div className="srs-story-page" onClick={() => setActiveWord(null)}>
            {/* Header */}
            <div className="srs-header" style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
                <button className="srs-back-link" onClick={handleBack}>← Back</button>
                <span className="srs-deck-name">{story.name}</span>
                <SRSSettings />
            </div>

            {/* Legend */}
            <div className="srs-story-legend">
                <span className="srs-story-legend-dot new" /> <span className="srs-story-legend-label">New</span>
                <span className="srs-story-legend-dot learning" /> <span className="srs-story-legend-label">Learning</span>
                <span className="srs-story-legend-dot mature" /> <span className="srs-story-legend-label">Mature</span>
                <span className="srs-story-legend-label muted">· tap a word for translation</span>
            </div>

            {/* Story body */}
            <div className="srs-story-body" onClick={e => e.stopPropagation()}>
                {story.sentences.map((sentence, sIdx) => (
                    <div
                        key={sIdx}
                        className={`srs-story-sentence ${playingIndex === sIdx ? "playing" : ""}`}
                        onClick={() => handleSentenceClick(sIdx)}
                    >
                        <div className="srs-story-target">
                            {sentence.tokens.map((token, tIdx) => {
                                const status = getTokenStatus(token.cardId, deckState);
                                if (!token.cardId && !token.translation) {
                                    return <span key={tIdx}>{token.text}</span>;
                                }
                                return (
                                    <span
                                        key={tIdx}
                                        className={`srs-story-token ${status ?? ""}`}
                                        onClick={e => handleTokenClick(e, token)}
                                    >
                                        {token.text}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="srs-story-base">{sentence.base_language}</div>
                    </div>
                ))}
            </div>

            {/* Word popup — bottom sheet */}
            {activeWord && (
                <div className="srs-word-sheet" onClick={e => e.stopPropagation()}>
                    <div className="srs-word-sheet-inner">
                        <span className="srs-word-sheet-target">{activeWord.text}</span>
                        <span className="srs-word-sheet-translation">{activeWord.translation}</span>
                        {activeWord.status && (
                            <span className={`srs-word-sheet-badge ${activeWord.status}`}>
                                {STATUS_LABEL[activeWord.status]}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Player bar */}
            <div className="srs-story-player">
                <div className="srs-story-player-inner">
                    <div className="srs-story-speed">
                        <button onClick={e => { e.stopPropagation(); setSpeakingRate(r => Math.max(0.2, parseFloat((r - 0.1).toFixed(1)))); }}>−</button>
                        <span>{speakingRate.toFixed(1)}×</span>
                        <button onClick={e => { e.stopPropagation(); setSpeakingRate(r => Math.min(2.0, parseFloat((r + 0.1).toFixed(1)))); }}>+</button>
                    </div>
                    <button className="srs-story-play-btn" onClick={e => { e.stopPropagation(); handlePlayAll(); }}>
                        {isPlaying ? "⏸ Pause" : "▶ Play All"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SRSStoryReader;
