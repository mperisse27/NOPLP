import type { TimedLyrics } from "../types/gameTypes";

function parseLrc(lrcContent: string): TimedLyrics[] {
    const formattedLyrics: TimedLyrics[] = [];
    const lyrics = lrcContent.split('[0');
    lyrics.forEach((timedLyric, index) => {
        if (index > 0) {
            const [time, lyric] = timedLyric.split(']');
            const milliseconds = parseInt(time.split(':')[0]) * 60000 + parseInt(time.split(':')[1]) * 1000;
            formattedLyrics.push({ time: milliseconds, lyric: lyric.trim()});
        }
    });
    return formattedLyrics;
}

export default parseLrc;