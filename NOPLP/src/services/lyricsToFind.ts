import type { TimedLyrics } from "../types/gameTypes";

function getMissingLyrics(baseLyrics: TimedLyrics[], missingNumber: number): TimedLyrics[] {
    const numberOfLyrics = baseLyrics.length;
    const minimum = numberOfLyrics * 0.2; //Play a minimum of the song

    const missingNumberByPoints = {
        10: 2,
        20: 3,
        30: 4,
        40: 6,
        50: 8
    }

    const repeatingLyrics = baseLyrics
        .map((lyric, index) => {
            console.log("Checking lyric:", lyric.lyric, "at index:", index);
            console.log(baseLyrics.slice(0, index).findIndex(l => l.lyric === lyric.lyric))
            return baseLyrics.slice(0, index).findIndex(l => l.lyric === lyric.lyric) != -1;
        });

    let validLyrics = repeatingLyrics.map((isRepeating, index) =>
        !isRepeating &&
        index > minimum &&
        baseLyrics[index].lyric.length > missingNumber
        ? index : -1
    ).filter(index => index !== -1);

    console.log("Valid lyrics indices:", validLyrics);
    let missingIndex = -1;
    while (missingIndex == -1 && validLyrics.length > 0) {
        console.log(validLyrics.length);
        const randomIndex = validLyrics[Math.floor(Math.random() * validLyrics.length)];
        if (baseLyrics[randomIndex].lyric.length > missingNumber) {
            baseLyrics[randomIndex].missing = missingNumberByPoints[missingNumber as keyof typeof missingNumberByPoints];
            missingIndex = randomIndex;
        }
        else {
            validLyrics = validLyrics.filter(index => index !== randomIndex);
        }
    }
    if (validLyrics.length === 0) {
        console.warn("No valid lyrics found to remove words from.");
    }
    return baseLyrics;
}

export default getMissingLyrics;