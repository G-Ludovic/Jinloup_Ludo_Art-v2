import { useState } from "react";
import EditModal from "../EditModal/EditModal";
import "./SubjectCard.css";

interface SubjectCardProps {
  id: number;
  text?: string;
  validated: boolean;
  file?: string | null;
  sending_date?: string | null;
  onDelete: (id: number) => void;
  onValidate: (id: number, newText: string, file?: File) => void;
  onEdit?: (id: number, newText: string, file?: File) => void;
}

function SubjectCard({
  id,
  text = "",
  validated,
  file,
  sending_date,
  onDelete,
  onValidate,
  onEdit,
}: SubjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    file ? `http://localhost:3310${file}` : null,
  );

  // Générer timestamp si besoin
  const formattedDate = sending_date
    ? new Date(sending_date).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // Changement d'image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validation du message
  const handleValidate = () => {
    const value = (document.getElementById(`text-${id}`) as HTMLTextAreaElement)
      .value;
    onValidate(id, value, selectedFile || undefined);
  };

  return (
    <div className="subject-card">
      <figure>
        <img src="/images/user-circle.png" alt="avatar" />
        <h3>Pseudo</h3>
        <h4>Grade</h4>
      </figure>

      {/* Texte ou zone de saisie */}
      {validated ? (
        <figcaption>
          <p>{text}</p>
          {formattedDate && (
            <small className="message-date">Posté le {formattedDate}</small>
          )}
        </figcaption>
      ) : (
        <textarea
          id={`text-${id}`}
          cols={180}
          rows={10}
          maxLength={30000}
          minLength={10}
          defaultValue={text}
          placeholder="Écris ton message ici..."
        />
      )}

      {/* Image */}
      {preview && (
        <div className="message-image">
          <img src={preview} alt="preview" className="message-img" />
        </div>
      )}

      {/* Upload avant validation */}
      {!validated && (
        <div className="file-upload">
          <label htmlFor={`file-${id}`} className="file-label">
            🏞️ Ajouter une image
          </label>
          <input
            id={`file-${id}`}
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>
      )}

      <div className="actions">
        {!validated && (
          <button type="button" onClick={handleValidate}>
            ✔️ Valider
          </button>
        )}
        <button type="button" onClick={() => onDelete(id)}>
          ❌ Supprimer
        </button>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          ✏️ Modifier
        </button>
      </div>

      {/* Modale */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialText={text}
        initialImage={file}
        onConfirm={(newText, newFile) => onEdit?.(id, newText, newFile)}
      />
    </div>
  );
}

export default SubjectCard;
