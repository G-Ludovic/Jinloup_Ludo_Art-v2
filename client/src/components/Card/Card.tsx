interface CardProps {
  image: string;
  name: string;
  text?: string;
}

function Card({ image, name, text }: CardProps) {
  return (
    <figure>
      <img src={image} alt={name} />
      <article>{text}</article>
    </figure>
  );
}

export default Card;
