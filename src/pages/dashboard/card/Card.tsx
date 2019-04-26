import React, { useState } from "react";
import "./Card.css";
import { BackArrow } from "../../../svg/backArrow";
import { NextArrow } from "../../../svg/nextArrow";

export const Card = () => {
  const [rotate, rotateCard] = useState(false);

  const changeCard = () => rotateCard(!rotate);

  return (
    <div className="swipe-card d-flex align-items-center">
      <BackArrow
        action={() => {
          console.log("clicked");
          changeCard();
        }}
      />
      <div className="swipe-card__image-wrapper mx-4">
        <img
          className={`swipe-card__image swipe-card__image-front ${
            rotate ? "rotateNext" : ""
          }`}
          src="https://i.scdn.co/image/db2133234d458f432ca207e163a801524a15f993"
        />
        <img
          className={`swipe-card__image swipe-card__image-back ${rotate ? "rotateBack" : ""}`}
          src="https://i.scdn.co/image/cdca7dc20c778ada42fb18506ea1f26857f01d17"
        />
      </div>

      <NextArrow
        action={() => {
          console.log("clicked");
          changeCard();
        }}
      />
    </div>
  );
};
