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
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />

      {data.map((item, index) => (
        <a
          key={item.id}
          href={item.art}
          target="_blank"
          rel="noopener noreferrer"
          title={`Voir ${item.name} en grand`}
        >
          <img
            src={item.art}
            alt={item.name || `Dessin #${item.id}`}
            className={slide === index ? "slide" : "slide slide-hidden"}
          />
        </a>
      ))}

      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
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
          />
        ))}
      </span>
    </div>
  );
};
