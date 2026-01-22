import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAuth } from "../../api";
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
  edited_at?: string | null;
  user_name?: string;
}

interface CategoryTemplateProps {
  title: string;
  description: string;
  subjectId: number;
}

function CategoryTemplate({ subjectId }: CategoryTemplateProps) {
  const { isLogged } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Charger les messages de la catégorie (sujet)
  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchAuth<Message[]>(
        `/api/message?subject_id=${subjectId}`,
      );
      if (data) {
        setMessages(data);
      } else {
        toast.error("Erreur lors du chargement des messages.");
      }
    };
    loadMessages();
  }, [subjectId]);

  // Ajouter un nouveau message
  const handleAdd = async (formData: FormData) => {
    const data = await fetchAuth<Message>("/api/message", {
      method: "POST",
      body: formData,
      headers: {}, // Override for FormData
    });
    if (data) {
      setMessages((prev) => [...prev, data]);
    } else {
      toast.error("Erreur lors de l'envoi du message.");
    }
  };

  // Modifier un message existant
  const handleEdit = async (id: number, newText: string, newFile?: File) => {
    const formData = new FormData();
    formData.append("content", newText);
    if (newFile) formData.append("image", newFile);

    const data = await fetchAuth<Message>(`/api/message/${id}`, {
      method: "PUT",
      body: formData,
      headers: {}, // Override for FormData
    });
    if (data) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                content: data.content,
                file: data.file || msg.file,
                sending_date: data.sending_date || msg.sending_date,
                edited_at: data.edited_at || msg.edited_at,
              }
            : msg,
        ),
      );
    } else {
      toast.error("Erreur lors de la modification du message.");
    }
  };

  // Supprimer un message
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const res = await fetchAuth(`/api/message/${deleteId}`, {
      method: "DELETE",
    });
    if (res !== null) {
      setMessages((prev) => prev.filter((msg) => msg.id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("Message supprimé du forum.");
    } else {
      toast.error("Erreur lors de la suppression du message.");
    }
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
              isLogged={isLogged}
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
