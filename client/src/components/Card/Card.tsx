interface CardProps {
  image: string;
  name: string;
  text?: string;
}

function Card({ name, image, text }: CardProps) {
  return (
    <section className="main-card">
      <article className="card-image-container">
        <img
          src={image}
          alt={`Artwork titled ${name}`}
          className="card-image"
        />
      </article>
      <article className="card-content">
        <h3 className="card-title">{name}</h3>
        {text && <p className="card-text">{text}</p>}
      </article>
    </section>
  );
}

export default Card;
