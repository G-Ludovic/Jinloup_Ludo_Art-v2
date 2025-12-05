import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./Presentations.css";

function Presentations() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Présentations</h2>
        <p>Ici tu peux te présenter à la communauté.</p>
      </header>

      <CategoryTemplate
        title="Présentations"
        description="Ici tu peux te présenter à la communauté."
        subjectId={1}
        userId={3}
      />
    </main>
  );
}

export default Presentations;
