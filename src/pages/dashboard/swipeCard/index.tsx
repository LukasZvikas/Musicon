import React, { useState } from "react";
import "./SwipeCard.css";
import { BackArrow } from "../../../svg/backArrow";
import { NextArrow } from "../../../svg/nextArrow";

interface CardProps {
  nextSong: () => void;
  previousSong: () => void;
  image: string;
}

export const SwipeCard = ({ nextSong, previousSong, image }: CardProps) => {
  const [rotate, rotateCard] = useState(false);

  const changeCard = () => rotateCard(!rotate);

  return (
    <div className="swipe-card d-flex align-items-center">
      <BackArrow
        action={() => {
          changeCard();
          previousSong();
        }}
      />
      <div className="swipe-card__image-wrapper mx-4">
        <img
          className={`swipe-card__image swipe-card__image-front ${
            rotate ? "rotateNext" : ""
          }`}
          src={image}
        />
        <img
          className={`swipe-card__image swipe-card__image-back ${
            rotate ? "rotateBack" : ""
          }`}
          src={image}
        />
      </div>

      <NextArrow
        action={() => {
          changeCard();
          nextSong();
        }}
      />
    </div>
  );
};
