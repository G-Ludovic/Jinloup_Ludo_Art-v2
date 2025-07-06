import "./HomePage.css";

function HomePage() {
  return (
    <>
      <h1>Bienvenue</h1>
      <main className="home-main">
        <section>
          <img
            src="/images/banner-jinloup-ludo-art.webp"
            alt="Bannière du site"
          />
          <article>
            <p>
              <hr />
              "Bienvenue sur Jinloup Ludo Art, un espace dédié à l'art et au
              dessin. Ici, chaque trait de crayon raconte une histoire, chaque
              couleur exprime une émotion, et chaque œuvre est une fenêtre sur
              l'imaginaire. <br />
              Que vous soyez un artiste en herbe, un passionné de dessin ou
              simplement un amateur d'art, vous trouverez ici un endroit où
              explorer, apprendre et partager votre passion pour le dessin."
              <hr />
            </p>
          </article>
        </section>
      </main>
    </>
  );
}

export default HomePage;
