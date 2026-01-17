import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./Career.css";

function Career() {
  return (
    <>
      <header className="category-section-forum">
        <h1>
          <strong>Une carrière ?</strong>
          <p>Parlons avenir pro !</p>
        </h1>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Carrière et projets"
              description="Partage ton parcours professionnel, tes formations ou tes ambitions."
              subjectId={8}
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

export default Career;
