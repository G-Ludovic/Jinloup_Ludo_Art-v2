import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./Career.css";

function Career() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Une carrière ?</h2>
        <p>Parlons avenir pro !</p>
      </header>

      <CategoryTemplate
        title="Carrière et projets"
        description="Partage ton parcours professionnel, tes formations ou tes ambitions."
        subjectId={8}
        userId={3}
      />
    </main>
  );
}

export default Career;
