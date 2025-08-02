import "./HomeForum.css";

type Categorie = {
  id: string;
  name: string;
  message: string;
};

const categories: Categorie[] = [
  { id: "c1", name: "Présentations", message: "Présente-toi ici" },
  { id: "c2", name: "Trombinoscope", message: "Ajoute ta photo !" },
  { id: "c3", name: "Vos créations", message: "Partage tes dessins" },
  { id: "c4", name: "Vos passions", message: "Parle de ce que tu aimes" },
  { id: "c5", name: "La Tanière", message: "Discutons librement" },
  { id: "c6", name: "Évènements", message: "Retrouve les activités à venir" },
  { id: "c7", name: "Aides entre nous", message: "Besoin de soutien ?" },
  { id: "c8", name: "Une carrière ?", message: "Parlons avenir pro !" },
];

function HomeForum() {
  return (
    <article className="home-forum">
      <h3>Bienvenue sur le forum de Jinloup Ludo Art !</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Catégorie</th>
            <th scope="col">Messages</th>
            <th scope="col">Voir</th>
          </tr>
        </thead>
        <br />
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <th scope="row">{cat.name}</th>
              <td>{cat.message}</td>
              <td>
                <button type="button">Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default HomeForum;
