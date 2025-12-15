interface CardProps {
  image: string;
  name: string;
  text?: string;
}

function Card({ name, image, text }: CardProps) {
  return (
    <main className="card-add">
      <div className="card-content">
        <img src={image} alt={name} className="card-image" />
        <h4 className="card-title">{name}</h4>
        {text && <p className="card-text">{text}</p>}
      </div>
    </main>
  );
}

export default Card;
