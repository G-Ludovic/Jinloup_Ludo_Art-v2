import { useEffect, useState } from "react";
import "./EditModal.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  initialImage?: string | null; // image existante
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
  const [file, setFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);

  // Réinitialiser seulement quand la modale s’ouvre
  useEffect(() => {
    if (isOpen) {
      setText(initialText);
      setPreview(null);
      setFile(undefined);
    }
  }, [isOpen, initialText]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <main className="modal-overlay">
      <div className="modal-content">
        <h3>Modifier le message</h3>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={5000}
          placeholder="Écris ton texte ici..."
        />

        {/* Aperçu des images */}
        <div className="image-preview-zone">
          {preview ? (
            <>
              <p>Nouvelle image :</p>
              <img
                src={preview}
                alt="Prévisualisation"
                className="preview-img"
              />
            </>
          ) : initialImage ? (
            <>
              <p>Image actuelle :</p>
              <img
                src={`http://localhost:3310${initialImage}`}
                alt="preview"
                className="preview-img"
              />
            </>
          ) : (
            <p>Aucune image pour ce message.</p>
          )}
        </div>

        <label className="file-input">
          <span>Changer l’image (optionnel)</span>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-confirm"
            onClick={() => {
              onConfirm(text, file);
              onClose();
            }}
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
