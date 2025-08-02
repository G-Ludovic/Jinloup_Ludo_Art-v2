import "./LatestsPostsForum.css";

type Message = {
  id: string;
  content: string;
};

const messages: Message[] = [
  { id: "m1", content: "Bienvenue à tous !" },
  { id: "m2", content: "Super vos dessins !" },
  { id: "m3", content: "Qui participe à l’événement de septembre ?" },
  { id: "m4", content: "Vos astuces d’organisation ?" },
  { id: "m5", content: "Un bug sur le site ?" },
  { id: "m6", content: "Trop cool le nouveau thème" },
  { id: "m7", content: "Besoin d’aide en perspective" },
  { id: "m8", content: "Suggestions pour la galerie ?" },
];

function LatestsPostsForum() {
  return (
    <article className="latest-posts-forum">
      <h3>Derniers messages</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Message</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((mes, index) => (
            <tr key={mes.id}>
              <th scope="row">{index + 1}</th>
              <td>{mes.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default LatestsPostsForum;
