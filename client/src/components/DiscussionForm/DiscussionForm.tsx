import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../services/AuthContext";
import "./DiscussionForm.css";

interface DiscussionFormProps {
  subjectId: number;
  onAdd: (formData: FormData) => void;
}

function DiscussionForm({ subjectId, onAdd }: DiscussionFormProps) {
  const { isLogged } = useAuth();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Merci d’écrire un message avant d’envoyer !");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("subject_id", subjectId.toString());
    if (file) formData.append("image", file);

    onAdd(formData);

    // Reset
    setContent("");
    setFile(null);
    setPreview(null);
  };

  if (!isLogged) {
    return (
      <div className="login-prompt">
        <p>Connectez-vous pour poster un message.</p>
        <p>
          <Link to="/login">Se connecter</Link> ou{" "}
          <Link to="/registration">S'inscrire</Link>
        </p>
      </div>
    );
  }

  return (
    <form className="discussion-form" onSubmit={handleSubmit}>
      <label
        htmlFor="discussion-content"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}
      >
        Contenu de votre message
      </label>
      <textarea
        id="discussion-content"
        name="content"
        placeholder="Écris ton message ici..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        cols={70}
        required
      />

      <div className="form-actions">
        <label className="file-label">
          🏞️ Ajouter une image
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {preview && <img src={preview} alt="preview" className="preview-img" />}
        <button type="submit">Nouvelle discussion</button>
      </div>
    </form>
  );
}

export default DiscussionForm;
