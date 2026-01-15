import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./Helpers.css";

function Helpers() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Aides entre nous</h2>
        <p>Besoin de soutien ?</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Coup de patte"
              description="Besoin d’aide ou envie d’aider un autre membre ? C’est ici !"
              subjectId={7}
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

export default Helpers;
