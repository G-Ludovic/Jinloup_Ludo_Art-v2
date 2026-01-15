import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import "./MessagesPage.css";

interface Message {
  id: number;
  content: string;
  sending_date: string;
  user_id: number;
  subject_id: number;
  user_name: string;
  subject_title: string;
}

function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [subjects, setSubjects] = useState<{ id: number; title: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);

  // Récupération des messages
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/message", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setMessages(data);
      setFilteredMessages(data);

      // Extraire les sujets et auteurs uniques
      const uniqueSubjects = Array.from(
        new Map(
          data.map((m: Message) => [
            m.subject_id,
            { id: m.subject_id, title: m.subject_title || "" },
          ]),
        ).values(),
      ) as { id: number; title: string }[];
      const uniqueAuthors = Array.from(
        new Map(
          data.map((m: Message) => [
            m.user_id,
            { id: m.user_id, name: m.user_name || "" },
          ]),
        ).values(),
      ) as { id: number; name: string }[];

      setSubjects(uniqueSubjects);
      setAuthors(uniqueAuthors);
    } catch (err) {
      setError((err as Error).message);
      toast.error("❌ Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Suppression d'un message
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Affichage du contenu complet d'un message
  const handleViewContent = (message: Message) => {
    setSelectedMessage(message);
    setShowContentModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/message/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteId));
        toast.success("Message supprimé avec succès !");
      } else {
        toast.error("Erreur lors de la suppression du message.");
      }
    } catch {
      toast.error("Impossible de supprimer ce message.");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Filtrage des messages
  useEffect(() => {
    let filtered = messages;

    if (subjectFilter) {
      filtered = filtered.filter(
        (m) => m.subject_id === Number.parseInt(subjectFilter),
      );
    }

    if (authorFilter) {
      filtered = filtered.filter(
        (m) => m.user_id === Number.parseInt(authorFilter),
      );
    }

    setFilteredMessages(filtered);
  }, [messages, subjectFilter, authorFilter]);

  // Chargement initial
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  if (loading) return <p>Chargement des messages...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div className="messages-container">
      <h2>Gestion des messages 🗣️</h2>

      {/* Filtres */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="subject-filter">Filtrer par sujet :</label>
          <select
            id="subject-filter"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">Tous les sujets</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id.toString()}>
                {subject.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="author-filter">Filtrer par auteur :</label>
          <select
            id="author-filter"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">Tous les auteurs</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id.toString()}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {(subjectFilter || authorFilter) && (
          <button
            type="button"
            className="btn-clear-filters"
            onClick={() => {
              setSubjectFilter("");
              setAuthorFilter("");
            }}
          >
            Effacer les filtres
          </button>
        )}
      </div>

      {filteredMessages.length === 0 ? (
        <p>Aucun message trouvé.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contenu</th>
              <th>Auteur</th>
              <th>Sujet</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  {m.content.length > 50 ? (
                    <>
                      {`${m.content.substring(0, 50)}...`}
                      <button
                        type="button"
                        className="btn-view"
                        onClick={() => handleViewContent(m)}
                      >
                        Voir
                      </button>
                    </>
                  ) : (
                    m.content
                  )}
                </td>
                <td>{m.user_name || "Inconnu"}</td>
                <td>{m.subject_title || "Inconnu"}</td>
                <td>{new Date(m.sending_date).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(m.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Modal pour afficher le contenu complet */}
      {showContentModal && selectedMessage && (
        <div
          className="modal-overlay"
          onClick={() => setShowContentModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowContentModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            <h3>Message complet</h3>
            <div className="message-details">
              <p>
                <strong>ID:</strong> {selectedMessage.id}
              </p>
              <p>
                <strong>Auteur:</strong>{" "}
                {selectedMessage.user_name || "Inconnu"}
              </p>
              <p>
                <strong>Sujet:</strong>{" "}
                {selectedMessage.subject_title || "Inconnu"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedMessage.sending_date).toLocaleString()}
              </p>
              <p>
                <strong>Contenu:</strong>
              </p>
              <div className="message-content">{selectedMessage.content}</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowContentModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
