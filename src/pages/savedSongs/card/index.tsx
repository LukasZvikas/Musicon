import React from "react";
import "./Card.css";

interface CardProps {
  image: string;
}

export const Card = ({ image }: CardProps) => {
  return (
    <div className="swipe-card d-flex align-items-center">
      <div className="card__image-wrapper mx-4">
        <img
          className="swipe-card__image swipe-card__image-front"
          src={image}
          alt="album cover"
        />
      </div>
    </div>
  );
};
