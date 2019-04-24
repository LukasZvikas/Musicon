import React from "react";
import { quizData } from "./quizData";
import { Button } from "../button/";

const Quiz = () => {
  const renderGenres = (genres: { genre: string }[]) => {
    return genres.map((item, index: number) => (
      <Button key={index} genreName={item.genre} />
    ));
  };

  return <div>This is Quiz {renderGenres(quizData)}</div>;
};

export default Quiz;
