import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./YourCreations.css";

function YourCreations() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Vos créations</h2>
        <p>Partage tes dessins</p>
      </header>

      <CategoryTemplate
        title="Vos créations"
        description="Partage ici tes dessins, vidéos, musiques et autres œuvres !"
        subjectId={3}
        userId={3}
      />
    </main>
  );
}

export default YourCreations;
