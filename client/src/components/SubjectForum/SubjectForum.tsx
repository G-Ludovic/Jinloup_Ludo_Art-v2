import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./SubjectForum.css";

type Subject = {
  id: number;
  title: string;
  category_id: number;
  category_name?: string;
  creation_date?: string;
};

function SubjectForum() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/subject");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des sujets");
        }

        const data = await response.json();

        // On trie du plus récent au plus ancien
        const sorted = data.sort(
          (a: Subject, b: Subject) =>
            new Date(b.creation_date || "").getTime() -
            new Date(a.creation_date || "").getTime(),
        );

        setSubjects(sorted);
      } catch (error) {
        console.error("Erreur fetch sujets:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <article className="subject-forum">
      <h3>Les sujets</h3>

      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sujet</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Date</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((su, index) => (
            <tr key={su.id}>
              <th scope="row">{index + 1}</th>

              {/* Lien vers la page du sujet */}
              <td>
                <Link to={`/forum/subject/${su.id}`} className="subject-link">
                  {su.title}
                </Link>
              </td>

              <td>{su.category_name ?? "Non spécifiée"}</td>

              <td>
                {su.creation_date
                  ? new Date(su.creation_date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default SubjectForum;
