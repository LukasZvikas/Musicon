import React, { useState } from "react";
import "./Card.css";
import { BackArrow } from "../../../svg/backArrow";
import { NextArrow } from "../../../svg/nextArrow";

interface CardProps {
  nextSong: () => void;
  previousSong: () => void;
  updateImage: () => void;
  frontImage: string;
  backImage: string;
}

export const Card = ({
  nextSong,
  previousSong,
  updateImage,
  frontImage,
  backImage
}: CardProps) => {
  const [rotate, rotateCard] = useState(false);

  const changeCard = () => rotateCard(!rotate);

  return (
    <div className="swipe-card d-flex align-items-center">
      <BackArrow
        action={() => {
          console.log("clicked");
          changeCard();
          previousSong();
        }}
      />
      <div className="swipe-card__image-wrapper mx-4">
        <img
          className={`swipe-card__image swipe-card__image-front ${
            rotate ? "rotateNext" : ""
          }`}
          src={frontImage}
        />
        <img
          className={`swipe-card__image swipe-card__image-back ${
            rotate ? "rotateBack" : ""
          }`}
          src={backImage}
        />
      </div>

      <NextArrow
        action={() => {
          console.log("clicked");
          changeCard();
          nextSong();
          setTimeout(function() {
            updateImage();
          }, 500);
        }}
      />
    </div>
  );
};
