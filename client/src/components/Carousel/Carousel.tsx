import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";

interface Drawing {
  id: number;
  name: string;
  art: string;
}

interface CarouselProps {
  data: Drawing[];
}

export const Carousel = ({ data }: CarouselProps) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={prevSlide}
        aria-label="Slide précédente"
      />

      {data.map((item, index) => (
        <a
          key={item.id}
          href={item.art}
          target="_blank"
          rel="noopener noreferrer"
          title={
            item.name
              ? `Voir ${item.name} en grand`
              : `Voir dessin #${item.id} en grand`
          }
        >
          <img
            src={item.art}
            alt={
              slide === index
                ? item.name
                  ? `Voir ${item.name} en grand`
                  : `Voir dessin #${item.id} en grand`
                : ""
            }
            className={slide === index ? "slide" : "slide slide-hidden"}
            aria-hidden={slide !== index}
          />
          <span style={{ position: "absolute", left: "-10000px" }}>
            {item.name || `Dessin #${item.id}`}
          </span>
        </a>
      ))}

      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
        aria-label="Slide suivante"
      />

      <span className="indicators">
        {data.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setSlide(index)}
            className={
              slide === index ? "indicator" : "indicator indicator-inactive"
            }
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </span>
    </div>
  );
};
