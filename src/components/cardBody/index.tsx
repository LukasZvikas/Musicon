import React from "react";
import "./CardBody.css";

interface CardBodyProps {
  name: string;
  artists: { name: string }[];
  preview_url: string;
  style?: { name?: string; artist?: string; audioBar?: string };
}
export const CardBody = ({
  name,
  artists,
  preview_url,
  style
}: CardBodyProps) => {
  const renderArtists = (arr: { name: string }[]) => {
    return arr.map((artist: { name: string }, index: number) => {
      if (index === arr.length - 1) return artist.name;
      return artist.name + ", ";
    });
  };

  return (
    <div className="card__heading-wrapper mt-2">
      <div
        className={
          style && style.name ? style.name : "heading__primary m-2 text-center"
        }
      >
        {name}
      </div>
      <div
        className={
          style && style.artist
            ? style.artist
            : "heading__secondary mb-4 text-white text-center"
        }
      >
        {renderArtists(artists)}
      </div>
      <video className="card__audio-bar" controls>
        <source src={`${preview_url}`} type="audio/mpeg" />
      </video>
    </div>
  );
};
