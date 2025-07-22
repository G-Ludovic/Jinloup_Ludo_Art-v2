CREATE TABLE user (
  ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL
);

CREATE TABLE draw (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  image VARCHAR(250)
);

INSERT INTO user (id, email, password)
VALUES
  (1, "johndoe@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw"),
  (2, "petitloup@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg"),
  (3, "jinshi.wolf@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$cEdpRHRQdnR1YzZCQ05tVg$STyFmxsSPaX2akYNWNEZ9A"),
  (4, "kitsunekiss@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$Rmg2MnVtaGd5dG1xdGtmbA$cmHBOEOuGivPybVLLMEAwg");

INSERT INTO draw (id, name, image)
VALUES
  (1, "grimmjow-wonderwice", "https://1drv.ms/i/c/0473a9aa5199beca/EQyQBZ-odv1LuWvnW9CkhwgBUtf75pJUKHLgtSxisIto1w?e=53KlJJ"),
  (2, "wolfman", "https://1drv.ms/i/c/0473a9aa5199beca/EUE4mdu6rUlGhJISMJV6UJgB9tN-kUilOIO6pPIK-swKIw?e=LHlAwp"),
  (3, "sisu", "https://1drv.ms/i/c/0473a9aa5199beca/EaKeJWbKmMBMoPB9ZaeHTpgB6QeaufQQK3LuR3unHtApaA?e=YVuOAK");
