import OnlineForum from "../../components/OnlineForum/OnlineForum";
import SubjectCard from "../../components/SubjectCard/SubjectCard";
import "./Presentations.css";

function Presentations() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Présentations</h2>
        <p>Ici tu peux te présenter à la communauté.</p>
      </header>

      <section className="new-discussion">
        <button type="submit">Nouvelle discussion</button>
      </section>

      <div className="cat-pres">
        <article className="art-p">
          <SubjectCard />
        </article>
        <article className="onligne">
          <OnlineForum />
        </article>
      </div>
    </>
  );
}

export default Presentations;
