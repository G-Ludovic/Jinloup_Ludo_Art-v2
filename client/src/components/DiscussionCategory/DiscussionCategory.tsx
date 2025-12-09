import { useState } from "react";

interface Props {
  subjectId: number;
  userId: number;
  onAdd: (formData: FormData) => void;
}

export default function DiscussionForm({ subjectId, userId, onAdd }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("Le texte est requis");

    const formData = new FormData();
    formData.append("content", content);
    formData.append("subject_id", String(subjectId));
    formData.append("user_id", String(userId));
    if (file) formData.append("image", file);

    onAdd(formData);
    setContent("");
    setFile(null);
    setPreview(null);
  };

  return (
    <form className="discussion-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écris ton message ici..."
        rows={5}
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
