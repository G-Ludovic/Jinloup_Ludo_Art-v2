import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import DiscussionForm from "../DiscussionForm/DiscussionForm";
import SubjectCard from "../SubjectCard/SubjectCard";
import "../ConfirmationModal/ConfirmationModal.css";
import "./CategoryTemplate.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

interface Message {
  id: number;
  content: string;
  file?: string | null;
  sending_date?: string | null;
  edited_at?: string | null;
  user_name?: string;
}

interface CategoryTemplateProps {
  title: string;
  description: string;
  subjectId: number;
}

function CategoryTemplate({ subjectId }: CategoryTemplateProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Charger les messages de la catégorie (sujet)
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/message?subject_id=${subjectId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => toast.error("Erreur lors du chargement des messages."));
  }, [subjectId]);

  // Ajouter un nouveau message
  const handleAdd = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/message`, {
      method: "POST",
      body: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      toast.error("Erreur lors de l'envoi du message.");
      return;
    }
    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
  };

  // Modifier un message existant
  const handleEdit = async (id: number, newText: string, newFile?: File) => {
    const formData = new FormData();
    formData.append("content", newText);
    if (newFile) formData.append("image", newFile);

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/message/${id}`, {
      method: "PUT",
      body: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      toast.error("Erreur lors de la modification du message.");
      return;
    }

    const updated = await res.json();
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              content: updated.content,
              file: updated.file || msg.file,
              sending_date: updated.sending_date || msg.sending_date,
              edited_at: updated.edited_at || msg.edited_at,
            }
          : msg,
      ),
    );
  };

  // Supprimer un message
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/message/${deleteId}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      toast.error("Erreur lors de la suppression du message.");
      return;
    }

    setMessages((prev) => prev.filter((msg) => msg.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
    toast.success("Message supprimé du forum.");
  };

  return (
    <>
      <DiscussionForm subjectId={subjectId} onAdd={handleAdd} />

      <div className="category-messages">
        <article className="category-article">
          {messages.map((msg) => (
            <SubjectCard
              key={msg.id}
              id={msg.id}
              text={msg.content}
              file={msg.file}
              sending_date={msg.sending_date}
              edited_at={msg.edited_at}
              user_name={msg.user_name}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </article>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default CategoryTemplate;
