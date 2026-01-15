import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./YourCreations.css";

function YourCreations() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Vos créations</h2>
        <p>Partage tes dessins</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Vos créations"
              description="Partage ici tes dessins, vidéos, musiques et autres œuvres !"
              subjectId={3}
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

export default YourCreations;
