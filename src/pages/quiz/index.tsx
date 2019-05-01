import React, { useState } from "react";
import { Link } from "react-router-dom";
import { quizData } from "./quizData";
import { Button } from "../../components/button";
import "./Quiz.css";
import "../../Shared.css";

const Quiz = () => {
  const [genreState, changeGenreState] = useState(Array());

  const onGenreClick = (name: string) => {
    const newState = genreState;
    newState.push(name);
    changeGenreState([...newState]);
  };

  const renderGenres = (genres: { genre: string }[]) => {
    return genres.map((item, index: number) => (
      <div className="col-5 col-sm-3 col-md-2">
        <Button
          key={index}
          type={"quiz-empty"}
          title={item.genre}
          action={() => onGenreClick(item.genre)}
          fill={genreState.includes(item.genre)}
        />
      </div>
    ));
  };

  return (
    <div className="quiz h-100">
      <div className="heading__primary">Before We Start!</div>
      <div className="heading__secondary m-4 text-center text-white">
        Please choose up to three of your favorite music genres.{" "}
      </div>
      <div className="quiz__genres row">{renderGenres(quizData)}</div>
      <Link to={{ pathname: "/dashboard", state: genreState }}>
        <Button
          type={"primary"}
          title={"I'm ready!"}
          action={() => {}}
          fill={true}
        />
      </Link>
    </div>
  );
};

export default Quiz;
