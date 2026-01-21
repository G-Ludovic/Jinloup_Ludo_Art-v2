import AbstractSeeder from "./AbstractSeeder";

class ItemSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "item", truncate: true });
  }

  // La méthode run - Remplir la table 'item' avec des données fictives

  run() {
    const items = [
      { name: "Item1", description: "Premier item de test", price: 10.99 },
      { name: "Item2", description: "Deuxième item de test", price: 5.49 },
    ];

    for (const item of items) {
      this.insert(item);
    }
  }
}

// Exporter la classe ItemSeeder
export default ItemSeeder;
