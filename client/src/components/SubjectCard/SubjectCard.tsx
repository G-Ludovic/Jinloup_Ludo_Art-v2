import "./SubjectCard.css";

interface SubjectCardProps {
  id: number;
  text?: string;
  validated: boolean;
  onDelete: (id: number) => void;
  onValidate: (id: number, newtext: string) => void;
}

function SubjectCard({
  id,
  text = "",
  validated,
  onDelete,
  onValidate,
}: SubjectCardProps) {
  return (
    <div className="subject-card">
      <figure>
        <img src="/images/user-circle.png" alt="avatar" />
        <h3>Pseudo</h3>
        <h4>Grade</h4>
      </figure>

      {/* Si validé → afficher texte simple, sinon textarea */}
      {validated ? (
        <figcaption>
          <p>{text}</p>
        </figcaption>
      ) : (
        <textarea
          name="text"
          id={`text-${id}`}
          cols={100}
          rows={10}
          maxLength={5000}
          minLength={100}
          defaultValue={text}
          placeholder="Écris ton message ici..."
        />
      )}

      <div className="actions">
        <button type="button" onClick={() => onDelete(id)}>
          ❌
        </button>

        {!validated && (
          <button
            type="button"
            onClick={() => {
              const value = (
                document.getElementById(`text-${id}`) as HTMLTextAreaElement
              ).value;
              onValidate(id, value);
              console.log("Message validé:", value);
              // Ici, on pourra aussi appeler une fonction pour envoyer ce message à un serveur
            }}
          >
            ✔️
          </button>
        )}
      </div>
    </div>
  );
}

export default SubjectCard;
