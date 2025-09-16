import { useState } from "react";
import SubjectCard from "../../components/SubjectCard/SubjectCard";
import "./YourCreations.css";

interface Card {
  id: number;
  text?: string;
  validated: boolean;
}

function YourCreations() {
  const [subjectCards, setSubjectCards] = useState<Card[]>([]);

  // Ajoute une nouvelle carte (par défaut non validée)
  const handleAddCard = () => {
    setSubjectCards([
      ...subjectCards,
      { id: Date.now(), text: "Nouveau sujet", validated: false },
    ]);
  };

  // Supprime une carte
  const handleDeleteCard = (id: number) => {
    setSubjectCards(subjectCards.filter((card) => card.id !== id));
  };

  // Valide une carte et enregistre son texte
  const handleValidateCard = (id: number, newText: string) => {
    setSubjectCards(
      subjectCards.map((card) =>
        card.id === id ? { ...card, text: newText, validated: true } : card,
      ),
    );
    console.log("Carte validée :", id, newText);
  };

  return (
    <>
      <header className="category-section-forum">
        <h2>Vos créations</h2>
        <p>Partage tes dessins</p>
      </header>

      <section className="new-discussion">
        <button type="button" onClick={handleAddCard}>
          Nouvelle discussion
        </button>
      </section>

      <div className="cat-pres">
        <article className="art-p">
          {subjectCards.map((card) => (
            <SubjectCard
              key={card.id}
              id={card.id}
              text={card.text}
              validated={card.validated}
              onDelete={handleDeleteCard}
              onValidate={handleValidateCard}
            />
          ))}
        </article>
      </div>
    </>
  );
}

export default YourCreations;
