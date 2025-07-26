CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  pseudo VARCHAR(50) NOT NULL,
  avatar VARCHAR(255),
  location VARCHAR(100),
  bio TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL,
  registration_date DATE NOT NULL
);

CREATE TABLE draw (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  image VARCHAR(255)
);

CREATE TABLE subject (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  creation_date DATE NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES `user`(id)
);

CREATE TABLE comment (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  draw_date DATE NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  draw_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (draw_id) REFERENCES draw(id)
);

CREATE TABLE message (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  content TEXT NOT NULL,
  sending_date DATE NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  subject_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES `user`(id),
  FOREIGN KEY (subject_id) REFERENCES subject(id)
);

INSERT INTO user (id, pseudo, avatar, location, bio, email, password, registration_date)
VALUES
  (1, "Jdoe", "###", "2, rue fantôme, 99 999 Lost", "Je suis un fantôme", "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw", "2025-05-25"),
  (2, "PetitLoup", "###", "12, run de la neige, 59 999 Toundra", "Je suis un petit loup mignon", "petitloup@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg", "2024-06-14"),
  (3, "Jinloup", "###", "25, rue de la montagne, 59 999 Toundra", "Le secret du loup", "jinshi.wolf@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cEdpRHRQdnR1YzZCQ05tVg$STyFmxsSPaX2akYNWNEZ9A", "2020-01-22"),
  (4, "Kitsune", "###", "58, rue de la renardière, 79 999 Fox", "Le secret de la renarde", "kitsunekiss@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg", "2025-01-06");

