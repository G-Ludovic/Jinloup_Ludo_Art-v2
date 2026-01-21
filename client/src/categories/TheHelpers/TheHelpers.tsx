import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./TheHelpers.css";

function TheHelpers() {
  return (
    <>
      <header className="category-section-forum">
        <h1>
          <strong>Aides entre nous</strong>
          <p>Besoin de soutien ?</p>
        </h1>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Coup de patte"
              description="Besoin d’aide ou envie d’aider un autre membre ? C’est ici !"
              subjectId={7}
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

export default TheHelpers;
