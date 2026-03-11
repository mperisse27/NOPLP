CREATE TABLE "songs" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "artist_id" uuid,
  "year" int,
  "meme_chanson" boolean
);

CREATE TABLE "artists" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "themes" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "songs_themes" (
  "song_id" uuid,
  "theme_id" uuid
);

ALTER TABLE "songs" ADD FOREIGN KEY ("artist_id") REFERENCES "artists" ("id");

ALTER TABLE "songs_themes" ADD FOREIGN KEY ("song_id") REFERENCES "songs" ("id");

ALTER TABLE "songs_themes" ADD FOREIGN KEY ("theme_id") REFERENCES "themes" ("id");