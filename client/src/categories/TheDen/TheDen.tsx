import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import "./TheDen.css";

function TheDen() {
  return (
    <main>
      <header className="category-section-forum">
        <h2>La Tanière</h2>
        <p>Discutons librement</p>
      </header>

      <CategoryTemplate
        title="Le repaire du loup"
        description="Un lieu pour discuter librement avec la meute !"
        subjectId={5}
        userId={3}
      />
    </main>
  );
}

export default TheDen;
