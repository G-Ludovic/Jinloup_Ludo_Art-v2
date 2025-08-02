import "./OnlineForum.css";

type Grade = {
  id: string;
  logo: string;
  name: string;
  onLigne: number;
};

const grades: Grade[] = [
  { id: "g1", logo: "logo 1", name: "Admin", onLigne: 2 },
  { id: "g2", logo: "logo 2", name: "Modérateur", onLigne: 1 },
  { id: "g3", logo: "logo 3", name: "Grand Loup", onLigne: 0 },
  { id: "g4", logo: "logo 4", name: "Loup", onLigne: 3 },
  { id: "g5", logo: "logo 5", name: "Louveteau", onLigne: 4 },
];

function OnlineForum() {
  return (
    <article className="onligne-forum">
      <h3>Qui est en ligne ?</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Indicateur</th>
            <th scope="col">Grades</th>
            <th scope="col">En ligne</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((gra) => (
            <tr key={gra.id}>
              <th scope="row">{gra.logo}</th>
              <td>{gra.name}</td>
              <td>: {gra.onLigne}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default OnlineForum;
