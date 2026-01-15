import CategoryTemplate from "../../components/CategoryTemplate/CategoryTemplate";
import OnlineForum from "../../components/OnlineForum/OnlineForum";
import "./TheEvents.css";

function TheEvents() {
  return (
    <>
      <header className="category-section-forum">
        <h2>Évènements</h2>
        <p>Retrouve les activités à venir</p>
      </header>

      <main className="presentations-layout">
        <section className="forum-content">
          <article className="posts-forum">
            <CategoryTemplate
              title="Événements"
              description="Annonce ou découvre les événements de la communauté."
              subjectId={6}
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

export default TheEvents;
