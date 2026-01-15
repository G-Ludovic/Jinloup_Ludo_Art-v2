import { useState } from "react";
import EditModal from "../EditModal/EditModal";
import "./SubjectCard.css";

interface Props {
  id: number;
  text?: string;
  file?: string | null;
  sending_date?: string | null;
  user_name?: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string, newFile?: File) => void;
}

export default function SubjectCard({
  id,
  text = "",
  file,
  sending_date,
  user_name,
  onDelete,
  onEdit,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = sending_date
    ? new Date(sending_date).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="subject-card">
      <div className="message-content">
        {user_name && <strong className="user-name">Par {user_name}</strong>}
        <p>{text}</p>
        {file && (
          <img
            src={`http://localhost:3310${file}`}
            alt="message"
            className="message-img"
          />
        )}
        {formattedDate && <small>Posté le {formattedDate}</small>}
      </div>

      <div className="actions">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          ✏️ Modifier
        </button>
        <button type="button" onClick={() => onDelete(id)}>
          ❌ Supprimer
        </button>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialText={text}
        initialImage={file}
        onConfirm={(newText, newFile) => onEdit(id, newText, newFile)}
        mode="forum"
      />
    </div>
  );
}
