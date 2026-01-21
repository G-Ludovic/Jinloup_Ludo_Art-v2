import { useEffect, useState } from "react";
import "./LatestsPostsForum.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

type Message = {
  id: number;
  content: string;
  subject_title: string;
  sending_date: string;
};

function LatestsPostsForum() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/message`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des messages");
        }
        const data = await response.json();

        // S'assurer que data.messages ou data est un tableau
        const messagesArray: Message[] = Array.isArray(data)
          ? data
          : Array.isArray(data.messages)
            ? data.messages
            : [];

        // Trier du plus récent au plus ancien et limiter à 8 messages
        const sorted = messagesArray
          .sort(
            (a, b) =>
              new Date(b.sending_date).getTime() -
              new Date(a.sending_date).getTime(),
          )
          .slice(0, 8);

        setMessages(sorted);
      } catch (error) {
        console.error("Erreur fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <article className="latest-posts-forum">
      <h2>Derniers messages</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((mes) => (
            <tr key={mes.id}>
              <td>
                {mes.content.length > 60
                  ? `${mes.content.slice(0, 60)}...`
                  : mes.content}
              </td>
              <td>
                {new Date(mes.sending_date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default LatestsPostsForum;
