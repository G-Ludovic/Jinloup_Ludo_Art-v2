import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./YourPassions.css";

function YourPassions() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Vos Passions</h2>
        <p>Parle de ce que tu aimes</p>
      </header>

      <CategoryTemplate
        title="Vos passions"
        description="Discute de tes passions : nature, art, jeux vidéo, animaux et plus encore !"
        subjectId={4}
        userId={3}
      />
    </main>
  );
}

export default YourPassions;
