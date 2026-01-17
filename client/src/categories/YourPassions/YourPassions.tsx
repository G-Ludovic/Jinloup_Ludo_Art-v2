import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./YourPassions.css";

function YourPassions() {
  return (
    <>
      <header className="category-section-forum">
        <h1>
          <strong>Vos Passions</strong>
          <p>Parle de ce que tu aimes</p>
        </h1>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Vos passions"
              description="Discute de tes passions : nature, art, jeux vidéo, animaux et plus encore !"
              subjectId={4}
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

export default YourPassions;
