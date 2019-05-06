import React, { useState, useEffect } from "react";
import { quizData } from "./quizData";
import { Button } from "../../components/button";
import { SpotifyIcon } from "../../svg/spotifyIcon";
import { Alert } from "../../components/alert";
import { getStorageData, setStorageData } from "../../utilities/localStorage";
import "./Quiz.css";
import "../../Shared.css";

const Quiz = (props: any) => {
  const [genreState, changeGenreState] = useState(new Array());
  const [isLoginSuccess, changeLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isGenresError, setIsGenresError] = useState(false);

  const authorizeUser = async () => {
    const redirect_uri = window.location.href;
    window.location.href = `https://accounts.spotify.com/en/authorize?client_id=b1e047dc11e749cfb928e1d33b784a2b&response_type=token&redirect_uri=${redirect_uri}&scope=playlist-modify-public`;
  };

  useEffect(() => {
    if (props.location.state && props.location.state.authError) {
      props.history.replace({ pathname: "/", state: { authError: false } });
      onLoginError();
      return;
    }

    if (props.location.state && props.location.state.genresError) {
      props.history.replace({ pathname: "/", state: { genresError: false } });
      onGenresError();
      return;
    }

    const selectedGenres = getStorageData("selected_genres");

    if (selectedGenres) changeGenreState(selectedGenres);

    const token = getHash();
    if (token) localStorage.setItem("token", token);
    return;
  }, []);

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
    let newState;
    if (!genreState.includes(name) && genreState.length < 3) {
      newState = genreState;
      newState.push(name);
      changeGenreState([...newState]);
    } else {
      const indexOfItem = genreState.indexOf(name);

      if (indexOfItem === -1) return;

      newState = genreState;
      newState.splice(indexOfItem, 1);

      changeGenreState([...newState]);
    }
  };

  const onGenresError = () => {
    setIsGenresError(true);
    setTimeout(function() {
      setIsGenresError(false);
    }, 2000);
  };

  const onLoginError = () => {
    setIsLoginError(true);
    setTimeout(function() {
      setIsLoginError(false);
    }, 2000);
  };

  const renderGenres = (genres: { genre: string }[]) => {
    return genres.map((item, index: number) => (
      <div className="px-1 col-6 col-sm-5 col-md-2">
        <Button
          key={index}
          type={"quiz-empty"}
          title={item.genre}
          action={() => onGenreClick(item.genre)}
          colors={
            genreState.includes(item.genre)
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }
        />
      </div>
    ));
  };

  return (
    <div className="quiz h-100 content-wrapper">
      {isLoginSuccess ? (
        <Alert message={"You have logged in successfully!"} isSuccess={true} />
      ) : null}
      {isLoginError ? (
        <Alert message={"Please login first!"} isSuccess={false} />
      ) : null}
      {isGenresError ? (
        <Alert
          message={"Please choose at least one genre first!"}
          isSuccess={false}
        />
      ) : null}
      <div className="heading__primary">Before We Start!</div>
      <div className="d-flex align-items-center heading__secondary px-3">
        <div className="text-white">1.</div>
        <Button
          type={"primary ml-3"}
          title={"Login with Spotify"}
          action={() => {
            authorizeUser();
          }}
          colors={"bg-black text-white"}
        >
          <SpotifyIcon />
        </Button>
      </div>
      <div className="heading__secondary d-flex mb-4 mt-2 px-3 text-center text-white">
        <div className="text-white mx-2">2.</div>
        Choose up to three of your favorite music genres. Save the songs that
        you like and transfer them right to your real Spotify playlist!{" "}
      </div>
      <div className="quiz__genres row">{renderGenres(quizData)}</div>

      <Button
        type={"primary"}
        title={"I'm ready!"}
        colors={"bg-primary text-white"}
        action={() => {
          if (!getStorageData("token")) {
            console.log("here");
            return onLoginError();
          }
          console.log("genre", genreState);
          return !genreState.length
            ? onGenresError()
            : (setStorageData("selected_genres", genreState),
              props.history.push("/explore"));
        }}
      />
    </div>
  );
};

export default Quiz;
