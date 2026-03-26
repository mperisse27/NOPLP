import type { TimedLyrics } from "../types/gameTypes";

function getMissingLyrics(baseLyrics: TimedLyrics[], missingNumber: number): TimedLyrics[] {
    const numberOfLyrics = baseLyrics.length;
    const minimum = numberOfLyrics * 0.4; //Play a minimum of the song

    const missingNumberByPoints = {
        10: 2,
        20: 3,
        30: 4,
        40: 6,
        50: 8
    }

    let missingIndex = -1;
    while (missingIndex == -1) {
        const randomIndex = Math.floor(Math.random() * (numberOfLyrics - minimum) + minimum);
        if (baseLyrics[randomIndex].lyric.length > missingNumber) {
            baseLyrics[randomIndex].missing = missingNumberByPoints[missingNumber as keyof typeof missingNumberByPoints];
            missingIndex = randomIndex;
        }
    }
    return baseLyrics;
}

export default getMissingLyrics;