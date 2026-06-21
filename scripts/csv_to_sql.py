#!/usr/bin/env python3
"""Convert a semicolon-separated CSV of songs into a SQL script matching
the style of populate_database.sql.

Usage:
  python scripts/csv_to_sql.py input.csv output.sql

Behavior:
- Detects columns by header names; if header mapping seems inverted it
  heuristically swaps song/artist columns.
- Deduplicates identical (title, artist) pairs.
- Collects unique artists and themes, emitting INSERTs using gen_random_uuid().
- Songs reference artist IDs via `(SELECT id FROM artists WHERE name = '...')`.
- Themes map to songs in `songs_themes` using title/name lookups.

This script tries to be forgiving for the provided CSV where the header
may be inconsistent with the row ordering.
"""
import argparse
import csv
import sys
from collections import OrderedDict


def escape_sql(s: str) -> str:
    if s is None:
        return 'NULL'
    return "'" + s.replace("'", "''") + "'"


def infer_columns(header, sample_rows):
    # Normalize header
    lc = [h.strip().lower() for h in header]
    idx = {'song': None, 'artist': None, 'year': None, 'theme': None}
    # try by header names
    for i, h in enumerate(lc):
        if 'chansons' in h or 'song' in h or 'titre' in h or 'title' in h:
            idx['song'] = i
        if 'chanteurs' in h or 'artist' in h or 'interpr' in h or 'perform' in h:
            idx['artist'] = i
        if 'ann' in h or 'year' in h:
            idx['year'] = i
        if 'th' in h or 'theme' in h or 'thèmes' in h:
            idx['theme'] = i

    # If year not found by header, try to detect column with integer years
    if idx['year'] is None:
        for i in range(len(header)):
            count_numeric = 0
            for r in sample_rows:
                v = r[i].strip()
                if v.isdigit() and len(v) == 4:
                    count_numeric += 1
            if count_numeric >= max(1, len(sample_rows) // 2):
                idx['year'] = i
                break

    # If song/artist both found, validate mapping against samples
    if idx['song'] is not None and idx['artist'] is not None:
        # check if artist column contains digits (likely wrong)
        bad_artist = 0
        for r in sample_rows:
            if any(ch.isdigit() for ch in r[idx['artist']]):
                bad_artist += 1
        if bad_artist > len(sample_rows) // 2:
            # swap
            idx['song'], idx['artist'] = idx['artist'], idx['song']

    # Fallbacks: assign remaining columns heuristically
    cols = set(range(len(header)))
    assigned = {v for v in idx.values() if v is not None}
    remaining = list(cols - assigned)
    if idx['song'] is None and remaining:
        idx['song'] = remaining.pop(0)
    if idx['artist'] is None and remaining:
        idx['artist'] = remaining.pop(0)
    if idx['theme'] is None and remaining:
        idx['theme'] = remaining.pop(0)
    if idx['year'] is None and remaining:
        idx['year'] = remaining.pop(0)

    return idx


def split_themes(theme_cell: str):
    if not theme_cell:
        return []
    # Some theme cells may contain multiple themes separated by commas
    parts = []
    for sep in [',', ';']:
        if sep in theme_cell:
            parts = [p.strip() for p in theme_cell.split(sep) if p.strip()]
            break
    if not parts:
        parts = [theme_cell.strip()]
    return parts


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('csv', help='Input CSV file (semicolon-separated)')
    parser.add_argument('sql', help='Output SQL file to write')
    args = parser.parse_args()

    with open(args.csv, newline='', encoding='utf-8-sig') as fh:
        # read all rows first to allow sampling
        reader = csv.reader(fh, delimiter=';')
        rows = [row for row in reader if any(cell.strip() for cell in row)]
    if not rows:
        print('Empty CSV', file=sys.stderr)
        sys.exit(1)

    header = rows[0]
    data_rows = rows[1:]
    sample = data_rows[:8]
    cols = infer_columns(header, sample if sample else data_rows[:1])

    artists = OrderedDict()
    themes = OrderedDict()
    songs = OrderedDict()  # key: (title, artist) -> dict
    song_theme_links = []

    for r in data_rows:
        # guard length
        if len(r) <= max(cols.values()):
            # pad
            r = r + [''] * (max(cols.values()) - len(r) + 1)
        title = r[cols['song']].strip()
        artist = r[cols['artist']].strip()
        year_raw = r[cols['year']].strip() if cols.get('year') is not None else ''
        theme_raw = r[cols['theme']].strip() if cols.get('theme') is not None else ''

        if not title and not artist:
            continue

        # If header mapping was inverted sometimes, try to detect and swap
        # when title looks like a year
        if title.isdigit() and (not artist.isdigit()):
            title, artist = artist, title

        # normalize
        title = title.strip()
        artist = artist.strip()

        # year as int or NULL
        year = None
        if year_raw.isdigit():
            try:
                year = int(year_raw)
            except ValueError:
                year = None

        key = (title, artist)
        if key in songs:
            # existing entry: prefer to keep year if missing
            if songs[key]['year'] is None and year is not None:
                songs[key]['year'] = year
        else:
            songs[key] = {'title': title, 'artist': artist, 'year': year, 'meme': False}

        if artist and artist not in artists:
            artists[artist] = True

        for th in split_themes(theme_raw):
            if th and th not in themes:
                themes[th] = True
            if th:
                song_theme_links.append((title, th))

    # Write SQL
    with open(args.sql, 'w', encoding='utf-8') as out:
        out.write("-- Generated by scripts/csv_to_sql.py\n")
        out.write("-- Cleans existing tables and inserts artists, themes, songs and mapping\n\n")
        out.write("DELETE FROM songs_themes;\n")
        out.write("DELETE FROM songs;\n")
        out.write("DELETE FROM themes;\n")
        out.write("DELETE FROM artists;\n\n")

        # Artists
        out.write("-- Insertion des artistes\n")
        out.write("INSERT INTO artists (id, name) VALUES\n")
        artist_items = []
        for a in artists.keys():
            artist_items.append(f"(gen_random_uuid(), {escape_sql(a)})")
        out.write(',\n'.join(artist_items) + ";\n\n")

        # Themes
        out.write("-- Insertion des thèmes\n")
        out.write("INSERT INTO themes (id, name) VALUES\n")
        theme_items = []
        for t in themes.keys():
            theme_items.append(f"(gen_random_uuid(), {escape_sql(t)})")
        if theme_items:
            out.write(',\n'.join(theme_items) + ";\n\n")
        else:
            out.write("-- (no themes found)\n\n")

        # Songs
        out.write("-- Insertion des chansons\n")
        out.write("INSERT INTO songs (id, title, artist_id, year, meme_chanson) VALUES\n")
        song_items = []
        for (title, artist), info in songs.items():
            year_sql = str(info['year']) if info['year'] is not None else 'NULL'
            meme = 'true' if info.get('meme') else 'false'
            song_items.append(
                f"(gen_random_uuid(), {escape_sql(title)}, (SELECT id FROM artists WHERE name = {escape_sql(artist)}), {year_sql}, {meme})"
            )
        out.write(',\n'.join(song_items) + ";\n\n")

        # songs_themes linking
        out.write("-- Insertion des relations chansons <-> thèmes\n")
        out.write("INSERT INTO songs_themes (song_id, theme_id) VALUES\n")
        link_items = []
        # dedupe links
        seen_links = set()
        for title, th in song_theme_links:
            key = (title, th)
            if key in seen_links:
                continue
            seen_links.add(key)
            # Find the artist for this song to disambiguate in case of duplicate titles
            song_info = songs.get((title, next((a for (t, a) in songs.keys() if t == title), None)))
            if not song_info:
                # Fallback: find any song with this title
                for (t, a), info in songs.items():
                    if t == title:
                        song_info = info
                        break
            if song_info:
                artist_name = song_info['artist']
                link_items.append(
                    f"((SELECT id FROM songs WHERE title = {escape_sql(title)} AND artist_id = (SELECT id FROM artists WHERE name = {escape_sql(artist_name)})), (SELECT id FROM themes WHERE name = {escape_sql(th)}))"
                )
            else:
                # Fallback if artist not found
                link_items.append(
                    f"((SELECT id FROM songs WHERE title = {escape_sql(title)}), (SELECT id FROM themes WHERE name = {escape_sql(th)}))"
                )
        if link_items:
            out.write(',\n'.join(link_items) + ";\n")
        else:
            out.write("-- (no links)\n")

    print(f'Wrote {len(artists)} artists, {len(themes)} themes, {len(songs)} songs to {args.sql}')


if __name__ == '__main__':
    main()
