import { useEffect, useState } from "react";
import "./LatestsPostsForum.css";

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
        const response = await fetch("http://localhost:3310/api/message");
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
      <h3>Derniers messages</h3>

      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sujet</th>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((mes, index) => (
            <tr key={mes.id}>
              <th scope="row">{index + 1}</th>
              <td>{mes.subject_title}</td>
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
