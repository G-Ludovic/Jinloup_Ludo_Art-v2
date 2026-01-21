import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./Presentations.css";

function Presentations() {
  return (
    <>
      <header className="category-section-forum">
        <h1>
          <strong>Présentations</strong>
          <p>Ici tu peux te présenter à la communauté.</p>
        </h1>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Présentations"
              description="Ici tu peux te présenter à la communauté."
              subjectId={1}
            />
          </article>

          <article className="visual-forum">
            <img src="/images/bc_online_latests.webp" alt="wolfman warrior" />
            <OnlineForum />
          </article>
        </section>
      </main>
    </>
  );
}

export default Presentations;
