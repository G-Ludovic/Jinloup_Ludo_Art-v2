import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "user", truncate: true });
  }

  // La méthode run - Remplir la table 'user' avec des données fictives

  run() {
    // Générer et insérer des données fictives dans la table 'user'
    for (let i = 0; i < 10; i += 1) {
      // Générer de fausses données utilisateur
      const fakeUser = {
        email: this.faker.internet.email(), // Générer un faux e-mail à l'aide de la bibliothèque Faker
        password: this.faker.internet.password(), // Générer un faux mot de passe à l'aide de la bibliothèque Faker
        refName: `user_${i}`, // Créer un nom de référence pour l'utilisateur
      };

      // Insérer les données fakeUser dans la table 'user'
      this.insert(fakeUser); // insert into user(email, password) values (?, ?)
    }
  }
}

// Exporter la classe UserSeeder
export default UserSeeder;
