import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import DiscussionForm from "../DiscussionForm/DiscussionForm";
import SubjectCard from "../SubjectCard/SubjectCard";
import "../ConfirmationModal/ConfirmationModal.css";
import "./CategoryTemplate.css";

interface Message {
  id: number;
  content: string;
  file?: string | null;
  sending_date?: string | null;
  user_name?: string;
}

interface CategoryTemplateProps {
  title: string;
  description: string;
  subjectId: number;
}

function CategoryTemplate({ subjectId }: CategoryTemplateProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Charger les messages de la catégorie (sujet)
  useEffect(() => {
    fetch(`/api/message?subject_id=${subjectId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => toast.error("Erreur lors du chargement des messages."));
  }, [subjectId]);

  // Ajouter un nouveau message
  const handleAdd = async (formData: FormData) => {
    const res = await fetch("/api/message", {
      method: "POST",
      body: formData,
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

    const res = await fetch(`/api/message/${id}`, {
      method: "PUT",
      body: formData,
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

    const res = await fetch(`/api/message/${deleteId}`, {
      method: "DELETE",
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
      <DiscussionForm
        subjectId={subjectId}
        userId={user?.id || 0}
        onAdd={handleAdd}
      />

      <div className="category-messages">
        <article className="category-article">
          {messages.map((msg) => (
            <SubjectCard
              key={msg.id}
              id={msg.id}
              text={msg.content}
              file={msg.file}
              sending_date={msg.sending_date}
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
