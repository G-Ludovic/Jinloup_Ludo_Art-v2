import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        pseudo: "Jdoe",
        avatar: "###",
        location: "2, rue fantôme, 99 999 Lost",
        bio: "Je suis un fantôme",
        email: "johndoe@gmail.com",
        password:
          "$argon2id$v=19$m=16,t=2,p=1$WmRCS21yeTVMSGFlYkFiSA$BD49Ws1JoGxpCr0lF5Mkxw",
        role: "jeune loup",
      },
      {
        pseudo: "PetitLoup",
        avatar: "###",
        location: "12, run de la neige, 59 999 Toundra",
        bio: "Je suis un petit loup mignon",
        email: "petitloup@gmail.com",
        password:
          "$argon2id$v=19$m=16,t=2,p=1$NFpuWXFyYldKZTVXaDd3Yw$sEPJMkW3cOEiBNgK6rQOSg",
        role: "loup gardien",
      },
      {
        pseudo: "Jinloup",
        avatar: "###",
        location: "25, rue de la montagne, 59 999 Toundra",
        bio: "Le secret du loup",
        email: "jinshi.wolf@gmail.com",
        password:
          "$argon2d$v=19$m=16,t=2,p=1$THBzUlRGaTcxOWtSdzd3aA$YzIgD5uXbC0sDQIMhkGd8Q",
        role: "loup alpha",
      },
      {
        pseudo: "Kitsune",
        avatar: "###",
        location: "58, rue de la renardière, 79 999 Fox",
        bio: "Le secret de la renarde",
        email: "kitsunekiss@gmail.com",
        password:
          "$argon2d$v=19$m=16,t=2,p=1$MkxDVDdOc3hWOVpGTnB0NA$IoknlDz4vSmaP0Y/dqbdwg",
        role: "jeune loup",
      },
    ];

    for (const user of users) {
      this.insert(user);
    }
  }
}

export default UserSeeder;
