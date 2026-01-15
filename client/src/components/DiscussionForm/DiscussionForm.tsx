import { useState } from "react";
import "./DiscussionForm.css";

interface DiscussionFormProps {
  subjectId: number;
  userId: number;
  onAdd: (formData: FormData) => void;
}

function DiscussionForm({ subjectId, userId, onAdd }: DiscussionFormProps) {
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
    formData.append("user_id", userId.toString());
    formData.append("subject_id", subjectId.toString());
    if (file) formData.append("image", file);

    onAdd(formData);

    // Reset
    setContent("");
    setFile(null);
    setPreview(null);
  };

  return (
    <form className="discussion-form" onSubmit={handleSubmit}>
      <textarea
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
