// SM-2 spaced repetition algorithm (Anki-style)
// Ratings: 1=Again, 2=Hard, 3=Good, 4=Easy

export type Rating = 1 | 2 | 3 | 4;

// Number of successful reviews before a card promotes to the next level
export const LEVEL_UP_REPS = 3;

export interface CardState {
    interval: number;       // days until next review (0 = new/learning)
    repetitions: number;    // number of successful review rounds at current level
    easeFactor: number;     // multiplier, starts at 2.5
    dueDate: string;        // ISO date string (YYYY-MM-DD)
    lapses: number;         // times failed after graduating
    level: number;          // current card level (0 = word, 1 = phrase, ...)
}

export const DEFAULT_CARD_STATE: CardState = {
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: todayISO(),
    lapses: 0,
    level: 0,
};

export function todayISO(): string {
    return new Date().toISOString().split("T")[0];
}

function addDays(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + Math.round(days));
    return d.toISOString().split("T")[0];
}

export function isDue(state: CardState): boolean {
    return state.dueDate <= todayISO();
}

export function isNew(state: CardState): boolean {
    return state.repetitions === 0 && state.interval === 0;
}

/** Returns the new card state. Does NOT handle level promotion — caller checks shouldLevelUp(). */
export function applyRating(state: CardState, rating: Rating): CardState {
    let { interval, repetitions, easeFactor, lapses, level } = state;

    const MIN_EASE = 1.3;

    if (rating === 1) {
        // Again: reset to relearning, keep level
        lapses += 1;
        interval = 1;
        repetitions = 0;
        easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
    } else if (repetitions === 0) {
        // First successful review
        interval = rating === 4 ? 4 : 1;
        repetitions = 1;
        if (rating === 2) easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
        if (rating === 4) easeFactor = Math.min(easeFactor + 0.15, 4.0);
    } else if (repetitions === 1) {
        interval = rating === 4
            ? Math.round(interval * easeFactor * 1.3)
            : Math.round(interval * easeFactor);
        interval = Math.max(interval, 1);
        repetitions = 2;
        if (rating === 2) easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
        if (rating === 4) easeFactor = Math.min(easeFactor + 0.15, 4.0);
    } else {
        if (rating === 2) {
            interval = Math.round(interval * 1.2);
            easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
        } else if (rating === 3) {
            interval = Math.round(interval * easeFactor);
        } else if (rating === 4) {
            interval = Math.round(interval * easeFactor * 1.3);
            easeFactor = Math.min(easeFactor + 0.15, 4.0);
        }
        interval = Math.max(interval, 1);
        repetitions += 1;
    }

    return {
        interval,
        repetitions,
        easeFactor,
        dueDate: rating === 1 ? todayISO() : addDays(interval),
        lapses,
        level,
    };
}

/** Returns a fresh state for the next level, preserving easeFactor as a reward. */
export function levelUpState(state: CardState): CardState {
    return {
        interval: 0,
        repetitions: 0,
        easeFactor: state.easeFactor,
        dueDate: todayISO(),
        lapses: 0,
        level: state.level + 1,
    };
}
