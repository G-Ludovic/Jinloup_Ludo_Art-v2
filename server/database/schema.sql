CREATE TABLE user (
  ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL
);

INSERT INTO user (id, email, password)
VALUES
  (1, "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$bnh3SWdQcXZOVXc5SEF4NQ$HhwqNmpIzASIlOYXi1mS4g");

