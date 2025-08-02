import "./SubjectForum.css";

type Subject = {
  id: string;
  title: string;
};

const subject: Subject[] = [
  { id: "s1", title: "Présentation du forum" },
  { id: "s2", title: "Vos créations préférées" },
  { id: "s3", title: "Événements à venir" },
  { id: "s4", title: "Nouveautés du site" },
  { id: "s5", title: "Partages de passions" },
  { id: "s6", title: "Questions techniques" },
  { id: "s7", title: "Débats entre membres" },
  { id: "s8", title: "Suggestions d’amélioration" },
];

function SubjectForum() {
  return (
    <article className="subject-forum">
      <h3>Les sujets</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Sujet</th>
          </tr>
        </thead>

        <tbody>
          {subject.map((su, index) => (
            <tr key={su.id}>
              <th scope="row">{index + 1}</th>
              <td>{su.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default SubjectForum;
