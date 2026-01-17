import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./HomeForum.css";

type Categorie = {
  id: number;
  name: string;
  description: string;
};

type Message = {
  id: number;
  content: string;
  subject_title: string;
  category_id: number;
  sending_date: string;
};

function HomeForum() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur fetch catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Charger les messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/message");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Erreur fetch messages:", error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <article className="home-forum">
      <h2>Bienvenue sur le forum de Jinloup Ludo Art !</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Catégorie</th>
            <th scope="col">Messages récents</th>
            <th scope="col">Voir</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => {
            // Filtrer les messages appartenant à cette catégorie
            const messagesForCategory = messages
              .filter((msg) => msg.category_id === cat.id)
              // Trier les messages du plus récent au plus ancien
              .sort(
                (a, b) =>
                  new Date(b.sending_date).getTime() -
                  new Date(a.sending_date).getTime(),
              )
              // Garder seulement les 3 plus récents
              .slice(0, 3);

            return (
              <tr key={cat.id}>
                <th scope="row">{cat.name}</th>

                <td>
                  {messagesForCategory.length > 0 ? (
                    <ul className="message-list">
                      {messagesForCategory.map((msg) => (
                        <li key={msg.id}>
                          <strong>{msg.subject_title}</strong>
                          <br />
                          <span className="message-preview">
                            {msg.content.length > 60
                              ? `${msg.content.slice(0, 60)}...`
                              : msg.content}
                          </span>
                          <br />
                          <small className="message-date">
                            🕒{" "}
                            {new Date(msg.sending_date).toLocaleDateString(
                              "fr-FR",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <em>Aucun message pour cette catégorie</em>
                  )}
                </td>

                <td className="direction-button">
                  <Link to={`/forum/category/${cat.id}`}>
                    <button type="button" className="view-category-button">
                      🗂️
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
}

export default HomeForum;
