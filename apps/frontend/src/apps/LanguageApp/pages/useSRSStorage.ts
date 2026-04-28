import { CardState, DEFAULT_CARD_STATE, isDue, isNew } from "./sm2";

export interface SRSDeckState {
    [cardId: string]: CardState;
}

function storageKey(language: string, deckId: string): string {
    return `srs_state_${language}_${deckId}`;
}

export function loadDeckState(language: string, deckId: string): SRSDeckState {
    const raw = localStorage.getItem(storageKey(language, deckId));
    if (!raw) return {};
    try {
        return JSON.parse(raw) as SRSDeckState;
    } catch {
        return {};
    }
}

export function saveDeckState(language: string, deckId: string, state: SRSDeckState): void {
    localStorage.setItem(storageKey(language, deckId), JSON.stringify(state));
}

export function getCardState(deckState: SRSDeckState, cardId: string): CardState {
    return deckState[cardId] ?? { ...DEFAULT_CARD_STATE };
}

export function updateCardState(
    deckState: SRSDeckState,
    cardId: string,
    newState: CardState
): SRSDeckState {
    return { ...deckState, [cardId]: newState };
}

export interface DeckSummary {
    newCount: number;
    dueCount: number;
    learnCount: number;
}

export function getDeckSummary(
    cardIds: string[],
    deckState: SRSDeckState
): DeckSummary {
    let newCount = 0;
    let dueCount = 0;
    let learnCount = 0;

    for (const id of cardIds) {
        const state = getCardState(deckState, id);
        if (isNew(state)) {
            newCount++;
        } else if (state.repetitions > 0 && state.interval < 21 && isDue(state)) {
            learnCount++;
        } else if (isDue(state)) {
            dueCount++;
        }
    }

    return { newCount, dueCount, learnCount };
}

export function resetDeck(language: string, deckId: string): void {
    localStorage.removeItem(storageKey(language, deckId));
}
