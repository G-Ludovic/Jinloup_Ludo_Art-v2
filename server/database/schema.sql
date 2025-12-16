DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS draw;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS items;

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

INSERT INTO item (name, description, price) VALUES
('Item1', 'Premier item de test', 10.99),
('Item2', 'Deuxième item de test', 5.49);

-- INSERT USER DE DÉMO
INSERT INTO user (id, pseudo, avatar, location, bio, email, password, registration_date)
VALUES
  (1, "Jdoe", "###", "2, rue fantôme, 99 999 Lost", "Je suis un fantôme", "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw", "2025-05-25"),
  (2, "PetitLoup", "###", "12, run de la neige, 59 999 Toundra", "Je suis un petit loup mignon", "petitloup@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg", "2024-06-14"),
  (3, "Jinloup", "###", "25, rue de la montagne, 59 999 Toundra", "Le secret du loup", "jinshi.wolf@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cEdpRHRQdnR1YzZCQ05tVg$STyFmxsSPaX2akYNWNEZ9A", "2020-01-22"),
  (4, "Kitsune", "###", "58, rue de la renardière, 79 999 Fox", "Le secret de la renarde", "kitsunekiss@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg", "2025-01-06");

-- INSERT CATEGORY (forum principal)
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

-- On relie chaque subject à un user et une category existante
INSERT INTO subject (title, user_id, category_id)
VALUES
('Bienvenue dans Présentations', 1, 1),
('Trombinoscope officiel', 2, 2),
('Vos créations libres', 3, 3),
('Vos passions favorites', 4, 4),
('Discussions libres', 1, 5),
('Évènements à venir', 2, 6),
('Besoin d’aide ?', 3, 7),
('Carrières et avenir', 4, 8);

