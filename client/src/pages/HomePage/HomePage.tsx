import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <h1>Bienvenue sur Jinloup Ludo Art</h1>
      <main id="main-content" className="home-main">
        <section id="welcome" className="home-section">
          <article>
            <blockquote className="welcome-quote">
              "Bienvenue sur Jinloup Ludo Art, un espace dédié à l'art et au
              dessin. Ici, chaque trait de crayon raconte une histoire, chaque
              couleur exprime une émotion, et chaque œuvre est une fenêtre sur
              l'imaginaire. Que vous soyez un artiste en herbe, un passionné de
              dessin ou simplement un amateur d'art, vous trouverez ici un
              endroit où explorer, apprendre et partager votre passion pour le
              dessin."
            </blockquote>
            <div className="welcome-highlights">
              <div className="highlight-item">
                <h2>🎨 Explorez des Galeries Uniques</h2>
                <p>
                  Découvrez une collection d'œuvres originales qui inspirent et
                  émerveillent.
                </p>
              </div>
              <div className="highlight-item">
                <h2>💬 Participez à la Communauté</h2>
                <p>
                  Échangez avec des artistes passionnés, partagez vos créations
                  et recevez des conseils.
                </p>
              </div>
              <div className="highlight-item">
                <h2>🚀 Libérez Votre Imagination</h2>
                <p>
                  Laissez libre cours à votre créativité dans un environnement
                  stimulant et bienveillant.
                </p>
              </div>
              <div className="highlight-item">
                <h2>📚 Apprenez et Évoluez</h2>
                <p>
                  Développez vos compétences artistiques grâce à des ressources
                  et des échanges constructifs.
                </p>
              </div>
            </div>
            <Link to="/registration" className="welcome-cta">
              👉 Rejoignez-nous dès maintenant et faites partie de cette
              aventure artistique ! 🐺
            </Link>
          </article>
        </section>

        <section className="categories-section">
          <h2>Explorez nos catégories</h2>
          <div className="categories-grid">
            <Link to="/gallery" className="category-link">
              <div className="category-card">
                <h3>Galerie</h3>
                <p>Découvrez les œuvres exposées</p>
              </div>
            </Link>
            <Link to="/forum" className="category-link">
              <div className="category-card">
                <h3>Forum</h3>
                <p>Participez aux discussions</p>
              </div>
            </Link>
            <a href="#welcome" className="category-link">
              <div className="category-card">
                <h3>À propos</h3>
                <p>Découvrez notre univers artistique</p>
              </div>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
