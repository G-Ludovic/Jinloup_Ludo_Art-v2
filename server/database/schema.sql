CREATE TABLE user (
  ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(50) NOT NULL,
  avatar VARCHAR(255),
  location VARCHAR(100),
  bio TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL,
  registration_date DATE NOT NULL
);

CREATE TABLE draw (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  image VARCHAR(250)
);

CREATE TABLE comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  draw_date DATE NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  draw_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (draw_id) REFERENCES draw(id)
);

CREATE TABLE subject (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  creation_date DATE NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE message (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  sending_date DATE NOT NULL,
  user_id INT NOT NULL,
  subject_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (subject_id) REFERENCES Subject(id)
);

-- INSERT INTO user (id, pseudo, avatar, location, bio, email, password)
-- VALUES
--   (1, "Jdoe", "###", "Lost", "Je suis un fantôme", "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw"),
--   (2, "PetitLoup", "###", "Toundra", "", "petitloup@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg"),
--   (3, "Jinloup", "jinshi.wolf@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cEdpRHRQdnR1YzZCQ05tVg$STyFmxsSPaX2akYNWNEZ9A"),
--   (4, "Kitsune", "kitsunekiss@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg");

-- INSERT INTO draw (id, name, image)
-- VALUES
--   (1, "grimmjow-wonderwice", "https://1drv.ms/i/c/0473a9aa5199beca/EQyQBZ-odv1LuWvnW9CkhwgBUtf75pJUKHLgtSxisIto1w?e=53KlJJ"),
--   (2, "wolfman", "https://1drv.ms/i/c/0473a9aa5199beca/EUE4mdu6rUlGhJISMJV6UJgB9tN-kUilOIO6pPIK-swKIw?e=LHlAwp"),
--   (3, "sisu", "https://1drv.ms/i/c/0473a9aa5199beca/EaKeJWbKmMBMoPB9ZaeHTpgB6QeaufQQK3LuR3unHtApaA?e=YVuOAK");
