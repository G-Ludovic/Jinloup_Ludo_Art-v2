import { useEffect, useRef, useState } from "react";
import "./EditModal.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  initialImage?: string | null;
  onConfirm: (newText: string, newFile?: File) => void;
  mode?: "gallery" | "forum";
}

function EditModal({
  isOpen,
  onClose,
  initialText,
  initialImage,
  onConfirm,
  mode = "gallery",
}: EditModalProps) {
  const [text, setText] = useState(initialText);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialImage ? `http://localhost:3310${initialImage}` : null,
  );
  const dropRef = useRef<HTMLDivElement>(null);

  const maxLength = mode === "gallery" ? 18 : 5000;
  const labelText = mode === "gallery" ? "Titre : " : "";

  // Réinitialiser le contenu à l’ouverture
  useEffect(() => {
    if (isOpen) {
      setText(initialText);
      setFile(null);
      setPreview(initialImage ? `http://localhost:3310${initialImage}` : null);
    }
  }, [isOpen, initialText, initialImage]);

  if (!isOpen) return null;

  // --- Gestion du Drag & Drop ---
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
    dropRef.current?.classList.remove("drag-active");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropRef.current?.classList.add("drag-active");
  };

  const handleDragLeave = () => {
    dropRef.current?.classList.remove("drag-active");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // --- Validation ---
  const isTextModified = text.trim() && text !== initialText;
  const isImageModified = !!file;
  const isFormValid =
    mode === "gallery" ? isTextModified && isImageModified : isTextModified;

  const handleConfirm = () => {
    if (!text.trim()) {
      alert("Le champ de texte est requis");
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
        <h3>
          {mode === "gallery"
            ? "Modifier votre création"
            : "Modifier votre post"}
        </h3>

        {/* Champ texte */}
        <label htmlFor="text">{labelText}</label>
        {mode === "gallery" ? (
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxLength}
            placeholder="Nouveau titre (max 18 caractères)"
            className={isTextModified ? "" : "input-error"}
          />
        ) : (
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            maxLength={maxLength}
            placeholder="Modifiez votre message..."
            className={isTextModified ? "" : "input-error"}
          />
        )}

        {/* compteur */}
        <p
          className={`char-counter ${
            text.length >= maxLength ? "char-error" : ""
          }`}
        >
          {text.length}/{maxLength} caractères
        </p>

        {!isTextModified && (
          <p className="warning-msg">
            ⚠️ Veuillez modifier le {mode === "gallery" ? "titre" : "texte"} ⚠️
          </p>
        )}

        {/* Drag & drop pour les deux modes */}
        <h3>
          {mode === "gallery"
            ? "Nouvelle image"
            : "Image du message (optionnelle)"}
        </h3>
        <div
          ref={dropRef}
          className={`drop-zone ${
            mode === "gallery" && !isImageModified ? "input-error" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {preview ? (
            <>
              <img src={preview} alt="preview" className="preview-img" />
              <p>
                ⤿ Glissez une nouvelle image ici ou cliquez pour en ajouter une
              </p>
            </>
          ) : (
            <p>⤿ Glissez une image ici ou cliquez pour en ajouter une</p>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Avertissement obligatoire uniquement pour la galerie */}
        {mode === "gallery" && !isImageModified && (
          <p className="warning-msg">
            ⚠️ Veuillez sélectionner une nouvelle image ⚠️
          </p>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            type="submit"
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={!isFormValid}
            title={
              !isFormValid
                ? "Modifiez le texte et (si galerie) l'image avant d'enregistrer"
                : ""
            }
          >
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
