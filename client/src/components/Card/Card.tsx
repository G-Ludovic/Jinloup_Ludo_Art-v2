interface CardProps {
  image: string;
  text: string;
}

function Card({ image, text }: CardProps) {
  return (
    <figure>
      <img src={image} alt="" />
      <article>{text}</article>
    </figure>
  );
}

export default Card;
