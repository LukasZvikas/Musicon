import React, { useState } from "react";
import { quizData } from "./quizData";
import { Button } from "../../components/button/";
import "./Quiz.css";
import "../../Shared.css";

const Quiz = () => {
  const createStateStore = (arr: any) => {
    const store: any = [];

    for (let i = 0; i < arr.length; i++) {
      store[arr[i].genre] = false;
    }
    return store;
  };

  const quizState = createStateStore(quizData);

  const [genreState, changeGenreState] = useState(quizState);

  const onGenreClick = (name: string) => {
    const newState = genreState;
    newState[name] = !newState[name];
    changeGenreState({ ...newState });
  };

  const renderGenres = (genres: { genre: string }[]) => {
    return genres.map((item, index: number) => (
      <div className="col-5 col-sm-3 col-md-2">
        <Button
          key={index}
          type={"quiz-empty"}
          title={item.genre}
          action={() => onGenreClick(item.genre)}
          fill={genreState[item.genre]}
        />
      </div>
    ));
  };

  return (
    <div className="quiz h-100">
      <div className="heading__primary">Before We Start!</div>
      <div className="heading__secondary m-4 text-center">
        Please choose up to three of your favorite music genres.{" "}
      </div>
      <div className="quiz__genres row">{renderGenres(quizData)}</div>
      <Button
        type={"primary"}
        title={"I'm ready!"}
        action={() => {}}
        fill={"rgb(255, 78, 80)"}
      />
    </div>
  );
};

export default Quiz;
