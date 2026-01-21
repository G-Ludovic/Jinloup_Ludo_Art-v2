import "./AuthorPage.css";

function AuthorPage() {
  return (
    <main className="author-page">
      <h1>À propos</h1>
      <section className="author-main">
        <article className="presentation-author">
          <br />
          <h2>Coucou les artistes !</h2>
          <br />
          <p>
            Bienvenue sur mon site ! Je m'appelle Ludovic alias Jinloup,
            passionné de dessin, de mangas, de nature… et un peu geek sur les
            bords. Fasciné depuis toujours par les loups et les univers
            créatifs, je me suis lancé dans le développement web pour mêler
            technique et passion artistique. Ce site est né de cette envie : un
            espace où l’on peut partager nos créations, s’inspirer les uns des
            autres, et échanger entre artistes dans une ambiance conviviale.
          </p>
          <ul>
            <li>Publier tes dessins</li>
            <li>Découvrir ceux des autres</li>
            <li>Participer à des discussions sur le forum</li>
            <li>
              Ou simplement te balader dans un univers visuel et bienveillant
            </li>
          </ul>
          <p>
            Que tu sois amateur ou pro, tu es le/la bienvenu(e) ! Ce site est
            fait par un passionné, pour les passionnés. 🎨🐺💻
          </p>
        </article>
        <article className="image-author">
          <img
            src="\images\jinloup_ludo_dev.webp"
            alt="représentation imagée de Jinloup"
          />
        </article>
      </section>
    </main>
  );
}

export default AuthorPage;
