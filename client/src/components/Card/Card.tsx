interface CardProps {
  image: string;
  name: string;
  text?: string;
}

function Card({ name, image, text }: CardProps) {
  return (
    <section className="main-card">
      <article className="card-image-container">
        <img src={image} alt={name} className="card-image" />
      </article>
      <article className="card-content">
        <h4 className="card-title">{name}</h4>
        {text && <p className="card-text">{text}</p>}
      </article>
    </section>
  );
}

export default Card;
