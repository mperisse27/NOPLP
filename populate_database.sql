-- Nettoyage des tables
DELETE FROM songs_themes;
DELETE FROM songs;
DELETE FROM themes;
DELETE FROM artists;

-- Insertion des artistes avec UUID valides et aléatoires
INSERT INTO artists (id, name) VALUES
(gen_random_uuid(), 'Patrick Bruel'),
(gen_random_uuid(), 'Noir Désir'),
(gen_random_uuid(), 'Gérald De Palmas'),
(gen_random_uuid(), 'Début de Soirée'),
(gen_random_uuid(), 'Michel Delpech'),
(gen_random_uuid(), 'Bigflo & Oli'),
(gen_random_uuid(), 'Louise Attaque'),
(gen_random_uuid(), 'Christophe Maé'),
(gen_random_uuid(), 'Téléphone'),
(gen_random_uuid(), 'Charles Aznavour'),
(gen_random_uuid(), 'BB Brunes'),
(gen_random_uuid(), 'Francis Cabrel'),
(gen_random_uuid(), 'Michel Sardou'),
(gen_random_uuid(), 'Renan Luce'),
(gen_random_uuid(), 'Michel Berger'),
(gen_random_uuid(), 'Christophe'),
(gen_random_uuid(), 'Daniel Balavoine'),
(gen_random_uuid(), 'France Gall'),
(gen_random_uuid(), 'Alizée'),
(gen_random_uuid(), 'Indochine'),
(gen_random_uuid(), 'Jean-Jacques Goldman'),
(gen_random_uuid(), 'Mylène Farmer'),
(gen_random_uuid(), 'Stromae'),
(gen_random_uuid(), 'Angèle'),
(gen_random_uuid(), 'Jeanne Mas'),
(gen_random_uuid(), 'Louane'),
(gen_random_uuid(), 'Renaud'),
(gen_random_uuid(), 'Vianney');

-- Insertion des thèmes avec UUID valides et aléatoires
INSERT INTO themes (id, name) VALUES
(gen_random_uuid(), 'Prénoms'),
(gen_random_uuid(), 'Partir loin'),
(gen_random_uuid(), 'On fait la java'),
(gen_random_uuid(), 'En couleurs'),
(gen_random_uuid(), 'Darons'),
(gen_random_uuid(), 'On décolle'),
(gen_random_uuid(), 'Avec le mot Piano'),
(gen_random_uuid(), 'Guerres de voisinage');

-- Insertion des chansons avec UUID valides et références aux artistes
INSERT INTO songs (id, title, artist_id, year, meme_chanson) VALUES
(gen_random_uuid(), 'Le Loir et Cher', (SELECT id FROM artists WHERE name = 'Michel Delpech'), 1979, true),
(gen_random_uuid(), 'Nuit de folie', (SELECT id FROM artists WHERE name = 'Début de Soirée'), 1989, true),
(gen_random_uuid(), 'Sur la route', (SELECT id FROM artists WHERE name = 'Gérald De Palmas'), 1994, true),
(gen_random_uuid(), 'Une seule vie', (SELECT id FROM artists WHERE name = 'Gérald De Palmas'), 2000, true),
(gen_random_uuid(), 'J''en rêve encore', (SELECT id FROM artists WHERE name = 'Gérald De Palmas'), 2000, true),
(gen_random_uuid(), 'Elle habite ici', (SELECT id FROM artists WHERE name = 'Gérald De Palmas'), 2004, true),
(gen_random_uuid(), 'Casser la voix', (SELECT id FROM artists WHERE name = 'Patrick Bruel'), 1989, true),
(gen_random_uuid(), 'Qui a le droit', (SELECT id FROM artists WHERE name = 'Patrick Bruel'), 1991, true),
(gen_random_uuid(), 'J''te l''dis quand même', (SELECT id FROM artists WHERE name = 'Patrick Bruel'), 1989, true),
(gen_random_uuid(), 'Le vent nous portera', (SELECT id FROM artists WHERE name = 'Noir Désir'), 2001, true),
(gen_random_uuid(), 'L''homme pressé', (SELECT id FROM artists WHERE name = 'Noir Désir'), 1996, true),
(gen_random_uuid(), 'Demain', (SELECT id FROM artists WHERE name = 'Bigflo & Oli'), 2018, true),
(gen_random_uuid(), 'Dommage', (SELECT id FROM artists WHERE name = 'Bigflo & Oli'), 2017, true),
(gen_random_uuid(), 'Coup de vieux', (SELECT id FROM artists WHERE name = 'Bigflo & Oli'), 2022, true),
(gen_random_uuid(), 'Léa', (SELECT id FROM artists WHERE name = 'Louise Attaque'), 1997, true),
(gen_random_uuid(), 'J''t''emmène au vent', (SELECT id FROM artists WHERE name = 'Louise Attaque'), 1997, true),
(gen_random_uuid(), 'Dingue, dingue, dingue', (SELECT id FROM artists WHERE name = 'Christophe Maé'), 2010, true),
(gen_random_uuid(), 'Belle demoiselle', (SELECT id FROM artists WHERE name = 'Christophe Maé'), 2007, true),
(gen_random_uuid(), 'Un autre monde', (SELECT id FROM artists WHERE name = 'Téléphone'), 1984, true),
(gen_random_uuid(), 'Ça (c''est vraiment toi)', (SELECT id FROM artists WHERE name = 'Téléphone'), 1982, true),
(gen_random_uuid(), 'La bohème', (SELECT id FROM artists WHERE name = 'Charles Aznavour'), 1965, true),
(gen_random_uuid(), 'Emmenez-moi', (SELECT id FROM artists WHERE name = 'Charles Aznavour'), 1968, true),
(gen_random_uuid(), 'Coups et blessures', (SELECT id FROM artists WHERE name = 'BB Brunes'), 2012, true),
(gen_random_uuid(), 'Dis-moi', (SELECT id FROM artists WHERE name = 'BB Brunes'), 2007, true),
(gen_random_uuid(), 'L''encre de tes yeux', (SELECT id FROM artists WHERE name = 'Francis Cabrel'), 1980, true),
(gen_random_uuid(), 'Petite Marie', (SELECT id FROM artists WHERE name = 'Francis Cabrel'), 1977, true),
(gen_random_uuid(), 'Encore et encore', (SELECT id FROM artists WHERE name = 'Francis Cabrel'), 1985, true),
(gen_random_uuid(), 'La corrida', (SELECT id FROM artists WHERE name = 'Francis Cabrel'), 1994, true),
(gen_random_uuid(), 'La Java de Broadway', (SELECT id FROM artists WHERE name = 'Michel Sardou'), 1977, true),
(gen_random_uuid(), 'La maladie d''amour', (SELECT id FROM artists WHERE name = 'Michel Sardou'), 1973, true),
(gen_random_uuid(), 'Les voisines', (SELECT id FROM artists WHERE name = 'Renan Luce'), 2006, true),
(gen_random_uuid(), 'La groupie du pianiste', (SELECT id FROM artists WHERE name = 'Michel Berger'), 1980, false),
(gen_random_uuid(), 'Les mots bleus', (SELECT id FROM artists WHERE name = 'Christophe'), 1974, true),
(gen_random_uuid(), 'Mon fils ma bataille', (SELECT id FROM artists WHERE name = 'Daniel Balavoine'), 1980, true),
(gen_random_uuid(), 'Dans mon H.L.M.', (SELECT id FROM artists WHERE name = 'Renaud'), 1980, true),
(gen_random_uuid(), 'Mistral gagnant', (SELECT id FROM artists WHERE name = 'Renaud'), 1985, true),
(gen_random_uuid(), 'Je vole', (SELECT id FROM artists WHERE name = 'Louane'), 2014, true),
(gen_random_uuid(), 'Il jouait du piano debout', (SELECT id FROM artists WHERE name = 'France Gall'), 2001, false),
(gen_random_uuid(), 'Résiste', (SELECT id FROM artists WHERE name = 'France Gall'), 1981, false),
(gen_random_uuid(), 'Moi... Lolita', (SELECT id FROM artists WHERE name = 'Alizée'), 2000, true),
(gen_random_uuid(), 'L''Aventurier', (SELECT id FROM artists WHERE name = 'Indochine'), 1982, false),
(gen_random_uuid(), '3e Sexe', (SELECT id FROM artists WHERE name = 'Indochine'), 1985, false),
(gen_random_uuid(), 'Encore un matin', (SELECT id FROM artists WHERE name = 'Jean-Jacques Goldman'), 1984, false),
(gen_random_uuid(), 'Envole-moi', (SELECT id FROM artists WHERE name = 'Jean-Jacques Goldman'), 1984, false),
(gen_random_uuid(), 'Libertine', (SELECT id FROM artists WHERE name = 'Mylène Farmer'), 1986, false),
(gen_random_uuid(), 'Pourvu qu''elles soient douces', (SELECT id FROM artists WHERE name = 'Mylène Farmer'), 1988, false),
(gen_random_uuid(), 'Alors on danse', (SELECT id FROM artists WHERE name = 'Stromae'), 2009, true),
(gen_random_uuid(), 'Papaoutai', (SELECT id FROM artists WHERE name = 'Stromae'), 2013, false),
(gen_random_uuid(), 'Balance ton quoi', (SELECT id FROM artists WHERE name = 'Angèle'), 2018, false),
(gen_random_uuid(), 'Tout oublier', (SELECT id FROM artists WHERE name = 'Angèle'), 2018, false),
(gen_random_uuid(), 'En rouge et noir', (SELECT id FROM artists WHERE name = 'Jeanne Mas'), 2018, false),
(gen_random_uuid(), 'Je m''en vais', (SELECT id FROM artists WHERE name = 'Vianney'), 2015, true),
(gen_random_uuid(), 'Beau-papa', (SELECT id FROM artists WHERE name = 'Vianney'), 2020, false);

-- Insertion des relations avec références aux IDs générés
INSERT INTO songs_themes (song_id, theme_id) VALUES
((SELECT id FROM songs WHERE title = 'Léa'), (SELECT id FROM themes WHERE name = 'Prénoms')),
((SELECT id FROM songs WHERE title = 'Petite Marie'), (SELECT id FROM themes WHERE name = 'Prénoms')),

((SELECT id FROM songs WHERE title = 'Je m''en vais'), (SELECT id FROM themes WHERE name = 'Partir loin')),
((SELECT id FROM songs WHERE title = 'Emmenez-moi'), (SELECT id FROM themes WHERE name = 'Partir loin')),
((SELECT id FROM songs WHERE title = 'J''t''emmène au vent'), (SELECT id FROM themes WHERE name = 'Partir loin')),

((SELECT id FROM songs WHERE title = 'Alors on danse'), (SELECT id FROM themes WHERE name = 'On fait la java')),
((SELECT id FROM songs WHERE title = 'La Java de Broadway'), (SELECT id FROM themes WHERE name = 'On fait la java')),

((SELECT id FROM songs WHERE title = 'Mon fils ma bataille'), (SELECT id FROM themes WHERE name = 'Darons')),
((SELECT id FROM songs WHERE title = 'Papaoutai'), (SELECT id FROM themes WHERE name = 'Darons')),
((SELECT id FROM songs WHERE title = 'Beau-papa'), (SELECT id FROM themes WHERE name = 'Darons')),

((SELECT id FROM songs WHERE title = 'Je vole'), (SELECT id FROM themes WHERE name = 'On décolle')),
((SELECT id FROM songs WHERE title = 'Envole-moi'), (SELECT id FROM themes WHERE name = 'On décolle')),

((SELECT id FROM songs WHERE title = 'La groupie du pianiste'), (SELECT id FROM themes WHERE name = 'Avec le mot Piano')),
((SELECT id FROM songs WHERE title = 'Il jouait du piano debout'), (SELECT id FROM themes WHERE name = 'Avec le mot Piano')),

((SELECT id FROM songs WHERE title = 'Dans mon H.L.M.'), (SELECT id FROM themes WHERE name = 'Guerres de voisinage')),
((SELECT id FROM songs WHERE title = 'Les voisines'), (SELECT id FROM themes WHERE name = 'Guerres de voisinage')),

((SELECT id FROM songs WHERE title = 'Les mots bleus'), (SELECT id FROM themes WHERE name = 'En couleurs')),
((SELECT id FROM songs WHERE title = 'En rouge et noir'), (SELECT id FROM themes WHERE name = 'En couleurs'));
