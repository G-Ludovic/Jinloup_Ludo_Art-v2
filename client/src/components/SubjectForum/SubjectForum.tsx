import { useEffect, useState } from "react";
import "./SubjectForum.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

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
        const response = await fetch(`${API_URL}/api/subject`);
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des sujets");

        const data = await response.json();

        // Trier par date décroissante et ne garder que les 6 derniers
        const sorted = data
          .sort(
            (a: Subject, b: Subject) =>
              new Date(b.creation_date || "").getTime() -
              new Date(a.creation_date || "").getTime(),
          )
          .slice(0, 6);

        setSubjects(sorted);
      } catch (error) {
        console.error("Erreur fetch sujets:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <article className="subject-forum">
      <h2>Derniers sujets</h2>
      {subjects.length === 0 ? (
        <p>Aucun sujet disponible pour le moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sujet</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((su) => (
              <tr key={su.id}>
                <td>{su.title}</td>
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
      )}
    </article>
  );
}

export default SubjectForum;
