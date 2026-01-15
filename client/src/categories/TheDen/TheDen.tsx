import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./TheDen.css";

function TheDen() {
  return (
    <>
      <header className="category-section-forum">
        <h2>La Tanière</h2>
        <p>Discutons librement</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Le repaire du loup"
              description="Un lieu pour discuter librement avec la meute !"
              subjectId={5}
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

export default TheDen;
