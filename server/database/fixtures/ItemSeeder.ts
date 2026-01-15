import AbstractSeeder from "./AbstractSeeder";

// Importez les seeders qui doivent être exécutés avant celui-ci
// Suivez vos clés étrangères pour trouver le bon ordre ;)
import UserSeeder from "./UserSeeder";

class ItemSeeder extends AbstractSeeder {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractSeeder) avec les options appropriées
    super({ table: "item", truncate: true, dependencies: [UserSeeder] });
  }

  // La méthode run - Remplir la table 'item' avec des données fictives

  run() {
    // Générer et insérer des données fictives dans la table 'item'
    for (let i = 0; i < 10; i += 1) {
      // Générer des données d'articles fictives
      const fakeItem = {
        title: this.faker.lorem.word(), // Générer un faux titre à l'aide de la bibliothèque Faker
        user_id: this.getRef(`user_${i}`).insertId, // Récupérer l'insertId de l'utilisateur correspondant à partir de UserSeeder
      };

      // Insérer les données fakeItem dans la table 'item'
      this.insert(fakeItem); // insert into item(title, user_id) values (?, ?)
    }
  }
}

// Exporter la classe ItemSeeder
export default ItemSeeder;
