import { useEffect, useRef, useState } from "react";
import "./EditModal.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  initialImage?: string | null;
  onConfirm: (newText: string, newFile?: File) => void;
}

function EditModal({
  isOpen,
  onClose,
  initialText,
  initialImage,
  onConfirm,
}: EditModalProps) {
  const [text, setText] = useState(initialText);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialImage ? `http://localhost:3310${initialImage}` : null,
  );
  const dropRef = useRef<HTMLDivElement>(null);

  // Réinitialiser le contenu à l’ouverture
  useEffect(() => {
    if (isOpen) {
      setText(initialText);
      setFile(null);
      setPreview(initialImage ? `http://localhost:3310${initialImage}` : null);
    }
  }, [isOpen, initialText, initialImage]);

  if (!isOpen) return null;

  // Gestion du drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.add("drag-active");
  };

  const handleDragLeave = () => {
    dropRef.current?.classList.remove("drag-active");
  };

  // Sélection via input classique
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleConfirm = () => {
    if (!text.trim()) {
      alert("Le texte est requis");
      return;
    }
    onConfirm(text, file || undefined);
    onClose();
  };

  return (
    <main
      className="modal-overlay"
      typeof="button"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClose();
      }}
    >
      <div
        className="modal-content"
        typeof="button"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") e.stopPropagation();
        }}
      >
        <h3>Modifier le message</h3>

        {/* Texte */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={5000}
          placeholder="Écris ton texte ici..."
        />

        {/* Zone de drag & drop */}

        <h3>Modifier l'image</h3>
        <div
          ref={dropRef}
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {preview ? (
            <>
              <img src={preview} alt="preview" className="preview-img" />
              <p>Glisse une nouvelle image ici pour la remplacer</p>
            </>
          ) : (
            <p>Glisse une image ici ou clique pour en ajouter une</p>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button type="submit" className="btn-confirm" onClick={handleConfirm}>
            💾 Enregistrer
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            ❌ Annuler
          </button>
        </div>
      </div>
    </main>
  );
}

export default EditModal;
