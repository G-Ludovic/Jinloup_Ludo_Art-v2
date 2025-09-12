import "./SubjectCard.css";

function SubjectCard() {
  return (
    <div className="subject-card">
      <img src="#" alt="avatar" />
      <textarea
        name="text"
        id="text"
        cols={100}
        rows={10}
        maxLength={5000}
        minLength={100}
      >
        <p>Ici le texte du sujet</p>
      </textarea>
      <div className="actions">
        <button type="button">❌</button>
        <button type="button">✔️</button>
      </div>
    </div>
  );
}

export default SubjectCard;
