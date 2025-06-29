import "./GalleryPage.css";
import { drawings } from "../../data/drawings.ts";

function GalleryPage() {
  return (
    <>
      <h1>Galerie</h1>
      <main className="gallery-page">
        <article className="gallery-article">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="card">
              <a
                className="click-link"
                href={drawing.art}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="draw-img"
                  src={drawing.art}
                  alt={drawing.name || `Dessin #${drawing.id}`}
                />
              </a>
              <p>{drawing.name || `Dessin #${drawing.id}`}</p>
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export default GalleryPage;
