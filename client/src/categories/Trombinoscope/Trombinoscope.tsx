import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./Trombinoscope.css";

function Trombinoscope() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Trombinoscope</h2>
        <p>Ajoute ta photo !</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Présentations"
              description="Ici tu peux te présenter à la communauté."
              subjectId={2}
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

export default Trombinoscope;
