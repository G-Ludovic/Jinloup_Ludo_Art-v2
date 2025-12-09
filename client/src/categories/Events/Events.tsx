import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./Events.css";

function Events() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Évènements</h2>
        <p>Retrouve les activités à venir</p>
      </header>

      <CategoryTemplate
        title="Événements"
        description="Annonce ou découvre les événements de la communauté."
        subjectId={6}
        userId={3}
      />
    </main>
  );
}

export default Events;
