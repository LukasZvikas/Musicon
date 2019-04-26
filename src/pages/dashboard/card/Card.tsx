import React from "react";
import "./Card.css";
import { NextArrow } from "../../../svg/nextArrow";
import { BackArrow } from "../../../svg/backArrow";

export const Card = () => {
  return (
    <div className="swipe-card d-flex align-items-center">
      <BackArrow />
      <div className="swipe-card__image-wrapper mx-4">
        <img
          className="swipe-card__image"
          src="https://i.scdn.co/image/db2133234d458f432ca207e163a801524a15f993"
        />
      </div>
      <NextArrow />
    </div>
  );
};
