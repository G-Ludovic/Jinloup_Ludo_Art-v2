import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./HomeForum.css";

type Categorie = {
  id: string;
  name: string;
  message: string;
};

function HomeForum() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/categories");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur fetch:", error);
      }
    };

    fetchCategories();
  }, []);

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
                <Link to={`/forum/category/${cat.id}`}>
                  <button type="button">Voir</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default HomeForum;
