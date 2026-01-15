-- CREATE TABLE user (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   pseudo VARCHAR(50) NOT NULL,
--   avatar VARCHAR(255),
--   location VARCHAR(100),
--   bio TEXT,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(500) NOT NULL,
--   registration_date DATE NOT NULL
-- );

-- CREATE TABLE draw (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   name VARCHAR(100) NOT NULL UNIQUE,
--   image VARCHAR(255)
-- );

-- CREATE TABLE subject (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   title VARCHAR(100) NOT NULL,
--   category VARCHAR(50),
--   creation_date DATE NOT NULL,
--   user_id INT UNSIGNED NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES `user`(id)
-- );

-- CREATE TABLE comment (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   draw_date DATE NOT NULL,
--   user_id INT UNSIGNED NOT NULL,
--   draw_id INT UNSIGNED NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES `user`(id),
--   FOREIGN KEY (draw_id) REFERENCES draw(id)
-- );

-- CREATE TABLE message (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   content TEXT NOT NULL,
--   sending_date DATE NOT NULL,
--   user_id INT UNSIGNED NOT NULL,
--   subject_id INT UNSIGNED NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES `user`(id),
--   FOREIGN KEY (subject_id) REFERENCES subject(id)
-- );

-- CREATE TABLE category (
--   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   name VARCHAR(100) NOT NULL,
--   message TEXT NOT NULL
-- );

-- INSERT INTO user (id, pseudo, avatar, location, bio, email, password, registration_date)
-- VALUES
--   (1, "Jdoe", "###", "2, rue fantôme, 99 999 Lost", "Je suis un fantôme", "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw", "2025-05-25"),
--   (2, "PetitLoup", "###", "12, run de la neige, 59 999 Toundra", "Je suis un petit loup mignon", "petitloup@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg", "2024-06-14"),
--   (3, "Jinloup", "###", "25, rue de la montagne, 59 999 Toundra", "Le secret du loup", "jinshi.wolf@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cEdpRHRQdnR1YzZCQ05tVg$STyFmxsSPaX2akYNWNEZ9A", "2020-01-22"),
--   (4, "Kitsune", "###", "58, rue de la renardière, 79 999 Fox", "Le secret de la renarde", "kitsunekiss@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg", "2025-01-06");

-- INSERT INTO category (name, message) VALUES
--   ("Présentations", "Présente-toi ici"),
--   ("Trombinoscope", "Ajoute ta photo !"),
--   ("Vos créations", "Partage tes dessins"),
--   ("Vos passions", "Parle de ce que tu aimes"),
--   ("La Tanière", "Discutons librement"),
--   ("Évènements", "Retrouve les activités à venir"),
--   ("Aides entre nous", "Besoin de soutien ?"),
--   ("Une carrière ?", "Parlons avenir pro !");

-- ========================================
-- Schéma complet pour Aiven
-- Supprime toutes les tables existantes
-- ========================================

DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS draw;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS item;

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
  avatar VARCHAR(255),
  location VARCHAR(100),
  bio TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL,
  role ENUM('loup alpha', 'loup gardien', 'jeune loup') DEFAULT 'jeune loup',
  registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE subject (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT UNSIGNED NOT NULL,
  category_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE message (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  file VARCHAR(255),
  sending_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  edited_at DATETIME NULL,
  user_id INT UNSIGNED NOT NULL,
  subject_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (subject_id) REFERENCES subject(id)
);

CREATE TABLE draw (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255),
  user_id INT UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE comment (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT UNSIGNED NOT NULL,
  draw_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (draw_id) REFERENCES draw(id)
);

-- Items
INSERT INTO item (name, description, price) VALUES
('Item1', 'Premier item de test', 10.99),
('Item2', 'Deuxième item de test', 5.49);

-- Users
INSERT INTO user (id, pseudo, avatar, location, bio, email, password, registration_date, role)
VALUES
  (1, 'Jdoe', '###', '2, rue fantôme, 99 999 Lost', 'Je suis un fantôme', 'johndoe@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw', '2025-05-25 00:00:00', 'jeune loup'),
  (2, 'PetitLoup', '###', '12, run de la neige, 59 999 Toundra', 'Je suis un petit loup mignon', 'petitloup@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg', '2024-06-14 00:00:00', 'loup gardien'),
  (3, 'Jinloup', '###', '25, rue de la montagne, 59 999 Toundra', 'Le secret du loup', 'jinshi.wolf@gmail.com', '$argon2d$v=19$m=16,t=2,p=1$THBzUlRGaTcxOWtSdzd3aA$YzIgD5uXbC0sDQIMhkGd8Q', '2020-01-22 00:00:00', 'loup alpha'),
  (4, 'Kitsune', '###', '58, rue de la renardière, 79 999 Fox', 'Le secret de la renarde', 'kitsunekiss@gmail.com', '$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg', '2025-01-06 00:00:00', 'jeune loup');

-- Categories
INSERT INTO category (name, description)
VALUES
('Présentations', 'Présente-toi ici'),
('Trombinoscope', 'Ajoute ta photo !'),
('Vos créations', 'Partage tes dessins'),
('Vos passions', 'Parle de ce que tu aimes'),
('La Tanière', 'Discutons librement'),
('Évènements', 'Retrouve les activités à venir'),
('Aides entre nous', 'Besoin de soutien ?'),
('Une carrière ?', 'Parlons avenir pro !');

-- Subjects
INSERT INTO subject (title, user_id, category_id, creation_date)
VALUES
('Ici tu peux te présenter à la communauté.', 1, 1, '2025-12-18 10:55:00'),
('Ajoute ta photo !', 2, 2, '2025-12-18 10:56:00'),
('Partage tes dessins', 3, 3, '2025-12-18 10:57:00'),
('Parle de ce que tu aimes', 4, 4, '2025-12-18 10:58:00'),
('Discutons librement', 1, 5, '2025-12-18 10:59:00'),
('Retrouve les activités à venir', 2, 6, '2025-12-18 11:00:00'),
('Besoin de soutien ?', 3, 7, '2025-12-18 11:01:00'),
('Parlons avenir pro !', 4, 8, '2025-12-18 11:02:00');
