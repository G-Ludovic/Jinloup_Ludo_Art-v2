import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./Helpers.css";

function Helpers() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Aides entre nous</h2>
        <p>Besoin de soutien ?</p>
      </header>

      <CategoryTemplate
        title="Coup de patte"
        description="Besoin d’aide ou envie d’aider un autre membre ? C’est ici !"
        subjectId={7}
        userId={3}
      />
    </main>
  );
}

export default Helpers;
