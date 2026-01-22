import AbstractSeeder from "./AbstractSeeder";

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  run() {
    const categories = [
      { name: "Présentations", description: "Présente-toi ici" },
      { name: "Trombinoscope", description: "Ajoute ta photo !" },
      { name: "Vos créations", description: "Partage tes dessins" },
      { name: "Vos passions", description: "Parle de ce que tu aimes" },
      { name: "La Tanière", description: "Discutons librement" },
      { name: "Évènements", description: "Retrouve les activités à venir" },
      { name: "Aides entre nous", description: "Besoin de soutien ?" },
      { name: "Une carrière ?", description: "Parlons avenir pro !" },
    ];

    for (const category of categories) {
      this.insert(category);
    }
  }
}

export default CategorySeeder;
