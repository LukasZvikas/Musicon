import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { quizData } from "./quizData";
import { Button } from "../../components/button";
import { SpotifyIcon } from "../../svg/spotifyIcon";
import { Alert } from "../../components/alert";
import "./Quiz.css";
import "../../Shared.css";

const Quiz = (props: any) => {
  const [genreState, changeGenreState] = useState(Array());
  const [isLoginSuccess, changeLoginSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const authorizeUser = async () => {
    window.location.href =
      "https://accounts.spotify.com/en/authorize?client_id=b1e047dc11e749cfb928e1d33b784a2b&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=playlist-modify-public";
  };

  useEffect(() => {
    if (props.location.state.authError) {
      setIsError(true);
      props.history.replace({ pathname: "/", state: {} });
      setTimeout(function() {
        setIsError(false);
      }, 2000);
      return;
    }
    const token = getHash();
    if (token) localStorage.setItem("token", token);
    return;
  });

  const getHash = () => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function(initial: any, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    window.location.hash = "";

    let _token = hash.access_token;
    if (_token) {
      changeLoginSuccess(true);
      setTimeout(function() {
        changeLoginSuccess(false);
      }, 2000);
    }

    return _token;
  };

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
          colors={
            genreState.includes(item.genre)
              ? { backgroundColor: "rgb(255, 78, 80)", color: "#fff" }
              : { backgroundColor: "#fff", color: "rgb(255, 78, 80)" }
          }
        />
      </div>
    ));
  };

  return (
    <div className="quiz h-100 d-flex align-items-center">
      {isLoginSuccess ? (
        <Alert message={"You have logged in successfully!"} isSuccess={true} />
      ) : null}
      {isError ? (
        <Alert message={"Please login first!"} isSuccess={false} />
      ) : null}
      <div className="heading__primary">Before We Start!</div>
      <div className="d-flex justify-content-around align-items-center">
        <div className="text-white" style={{ fontSize: "28px" }}>
          1.
        </div>
        <Button
          type={"primary"}
          title={"Login with Spotify"}
          action={() => {
            authorizeUser();
          }}
          colors={{ backgroundColor: "#000", color: "#fff" }}
        >
          <SpotifyIcon />
        </Button>
      </div>
      <div className="heading__secondary d-flex mb-4 mt-2 mx-3 text-center text-white">
        <div className="text-white mr-2" style={{ fontSize: "28px" }}>
          2.
        </div>
        Please choose up to three of your favorite music genres.{" "}
      </div>
      <div className="quiz__genres row">{renderGenres(quizData)}</div>
      <Link to={{ pathname: "/dashboard", state: genreState }}>
        <Button
          type={"primary"}
          title={"I'm ready!"}
          action={() => {}}
          colors={{ backgroundColor: "rgb(255, 78, 80)", color: "#fff" }}
        />
      </Link>
    </div>
  );
};

export default Quiz;
