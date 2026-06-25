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
            return baseLyrics.slice(0, index).findIndex(l => l.lyric === lyric.lyric) != -1;
        });

    let validLyrics = repeatingLyrics.map((isRepeating, index) =>
        !isRepeating &&
        index > minimum &&
        baseLyrics[index].lyric.split(/[\s',;:!?.-]+/).length > missingNumberByPoints[missingNumber as keyof typeof missingNumberByPoints]
        ? index : -1
    ).filter(index => index !== -1);

    // let missingIndex = -1;
    // while (missingIndex == -1 && validLyrics.length > 0) {
    //     const randomIndex = validLyrics[Math.floor(Math.random() * validLyrics.length)];
    //     if (baseLyrics[randomIndex].lyric.length > missingNumber) {
    //         baseLyrics[randomIndex].missing = missingNumberByPoints[missingNumber as keyof typeof missingNumberByPoints];
    //         missingIndex = randomIndex;
    //     }
    //     else {
    //         validLyrics = validLyrics.filter(index => index !== randomIndex);
    //     }
    // }
    // if (validLyrics.length === 0) {
    //     console.warn("No valid lyrics found to remove words from.");
    // }
    if (validLyrics.length > 0) {
        const randomIndex = validLyrics[Math.floor(Math.random() * validLyrics.length)];
        baseLyrics[randomIndex].missing = missingNumberByPoints[missingNumber as keyof typeof missingNumberByPoints];
    }
    else {
        console.warn("No valid lyrics found to remove words from.");
    }
    return baseLyrics;
}

function getSameSongLyrics(baseLyrics: TimedLyrics[]): TimedLyrics[] {
    const numberOfLyrics = baseLyrics.length;
    const minimum = numberOfLyrics * 0.1;
    const wordsToFind = [
        2, 4, 6, 10, 14
    ]

    const repeatingLyrics = baseLyrics
        .map((lyric, index) => {
            return baseLyrics.slice(0, index).findIndex(l => l.lyric === lyric.lyric) != -1;
        });

    let validLyrics = repeatingLyrics.map((isRepeating, index) =>
        !isRepeating &&
        index > minimum &&
        baseLyrics[index].lyric.split(/[\s',;:!?.-]+/).length > 2
        ? index : -1
    ).filter(index => index !== -1);

    let lastPickedIndex = -1;

    wordsToFind.reverse().forEach((wordsNumber, index) => {
        let randomIndex;
        if (index == 0) { //Take last lyrics not already sung
            randomIndex = validLyrics[validLyrics.length - 1];
            lastPickedIndex = validLyrics.length - 1;
        }
        else {
            const min = wordsToFind.length - index - 1;
            const max = lastPickedIndex - 1;
            const randomValidIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            randomIndex = validLyrics[randomValidIndex];
            lastPickedIndex = randomValidIndex;
        }
        baseLyrics[randomIndex].missing = Math.min(wordsNumber, baseLyrics[randomIndex].lyric.split(/[\s',;:!?.-]+/).length);
        validLyrics = validLyrics.filter(index => index !== randomIndex);
    });

    return baseLyrics;
}

export { getMissingLyrics, getSameSongLyrics };