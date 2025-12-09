import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./Trombinoscope.css";

function Trombinoscope() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>Trombinoscope</h2>
        <p>Ajoute ta photo !</p>
      </header>

      <CategoryTemplate
        title="Présentations"
        description="Ici tu peux te présenter à la communauté."
        subjectId={2}
        userId={3}
      />
    </main>
  );
}

export default Trombinoscope;
