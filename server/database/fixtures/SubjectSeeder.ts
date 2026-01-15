import AbstractSeeder from "./AbstractSeeder";
import CategorySeeder from "./CategorySeeder";
import UserSeeder from "./UserSeeder";

class SubjectSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "subject",
      truncate: true,
      dependencies: [UserSeeder, CategorySeeder],
    });
  }

  run() {
    const subjects = [
      {
        title: "Ici tu peux te présenter à la communauté.",
        user_id: 1,
        category_id: 1,
      },
      {
        title: "Ajoute ta photo !",
        user_id: 2,
        category_id: 2,
      },
      {
        title: "Partage tes dessins",
        user_id: 3,
        category_id: 3,
      },
      {
        title: "Parle de ce que tu aimes",
        user_id: 4,
        category_id: 4,
      },
      {
        title: "Discutons librement",
        user_id: 1,
        category_id: 5,
      },
      {
        title: "Retrouve les activités à venir",
        user_id: 2,
        category_id: 6,
      },
      {
        title: "Besoin de soutien ?",
        user_id: 3,
        category_id: 7,
      },
      {
        title: "Parlons avenir pro !",
        user_id: 4,
        category_id: 8,
      },
    ];

    for (const subject of subjects) {
      this.insert(subject);
    }
  }
}

export default SubjectSeeder;
