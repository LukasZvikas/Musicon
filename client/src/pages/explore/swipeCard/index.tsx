import React, { useState } from "react";
import "./SwipeCard.css";
import { BackArrow } from "../../../svg/backArrow";
import { NextArrow } from "../../../svg/nextArrow";

interface CardProps {
  nextSong: () => void;
  previousSong: () => void;
  image: string;
  listLength: number;
  currentIndex: number;
}

export const SwipeCard = ({
  nextSong,
  previousSong,
  image,
  currentIndex,
  listLength
}: CardProps) => {
  const [rotate, rotateCard] = useState(false);

  const changeCard = () => rotateCard(!rotate);

  return (
    <div className="swipe-card d-flex align-items-center">
      {currentIndex !== 0 ? (
        <BackArrow
          action={() => {
            changeCard();
            previousSong();
          }}
        />
      ) : (
        <div style={{width: "40px"}}/>
      )}
      <div className="swipe-card__image-wrapper mx-4">
        <img
          className={`swipe-card__image swipe-card__image-front ${
            rotate ? "rotateNext" : ""
          }`}
          src={image}
          alt="album cover"
        />
        <img
          className={`swipe-card__image swipe-card__image-back ${
            rotate ? "rotateBack" : ""
          }`}
          src={image}
          alt="album cover"
        />
      </div>
      {currentIndex !== listLength - 1 ? (
        <NextArrow
          action={() => {
            changeCard();
            nextSong();
          }}
        />
      ) : <div style={{width: "40px"}}/>}
    </div>
  );
};
