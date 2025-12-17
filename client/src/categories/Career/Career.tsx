import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./Career.css";

function Career() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Une carrière ?</h2>
        <p>Parlons avenir pro !</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Carrière et projets"
              description="Partage ton parcours professionnel, tes formations ou tes ambitions."
              subjectId={8}
              userId={3}
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
