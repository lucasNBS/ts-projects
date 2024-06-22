import { useState } from "react";
import {
  ArrowBigLeft,
  ArrowBigRight,
  CircleDotIcon,
  CircleIcon,
} from "lucide-react";
import "./style/imageSlider.css";

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showImage(imageToShow: "previous" | "next") {
    switch (imageToShow) {
      case "next":
        setImageIndex((index) => {
          if (index === images.length - 1) return 0;
          return index + 1;
        });
        break;
      case "previous":
        setImageIndex((index) => {
          if (index === 0) return images.length - 1;
          return index - 1;
        });
        break;
    }
  }

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slide" className="skip-link">
        Skip Image Slider
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((image, index) => {
          return (
            <img
              key={image.url}
              src={image.url}
              alt={image.alt}
              aria-hidden={index !== imageIndex}
              className="img-slider-img"
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          );
        })}
      </div>
      <button
        onClick={() => showImage("previous")}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={() => showImage("next")}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: "0.25rem",
        }}
      >
        {images.map((_, index) => {
          return (
            <button
              className="img-slider-dot-btn"
              key={index}
              aria-label={`View Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
            >
              {index === imageIndex ? (
                <CircleDotIcon aria-hidden />
              ) : (
                <CircleIcon aria-hidden />
              )}
            </button>
          );
        })}
      </div>
      <div id="after-image-slide"></div>
    </section>
  );
}
