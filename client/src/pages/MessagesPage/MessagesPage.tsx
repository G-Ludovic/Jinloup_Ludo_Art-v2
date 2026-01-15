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

  // Récupération des messages
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setMessages(data);
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

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/messages/${deleteId}`, {
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

  // Chargement initial
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  if (loading) return <p>Chargement des messages...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div className="messages-container">
      <h2>Gestion des messages 🗣️</h2>
      {messages.length === 0 ? (
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
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  {m.content.length > 50
                    ? `${m.content.substring(0, 50)}...`
                    : m.content}
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
    </div>
  );
}

export default MessagesPage;
