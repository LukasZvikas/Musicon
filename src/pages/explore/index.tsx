import React, { useState } from "react";
import {
  updateStorageData,
  getStorageData
} from "../../utilities/localStorage";
import { GET_TRACKS_QUERY } from "../../graphqlQueries";
import {
  SUGGESTED_TRACKS_ERROR,
  UNAUTHORIZED
} from "../../utilities/errorTypes";

import { Query } from "react-apollo";
import { SwipeCard } from "./swipeCard";
import { CardBody } from "../../components/cardBody";
import { Button } from "../../components/button";
import { Alert } from "../../components/alert";
import "../../Shared.css";
import "./Dashboard.css";

const Dashboard = (props: any) => {
  const [currentIndex, updateIndex] = useState(0);
  const [isSongSaved, setIsSongSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  const nextSong = () => {
    updateIndex(currentIndex + 1);
    const audioBar = document.querySelector(
      ".card__audio-bar"
    ) as HTMLVideoElement;
    if (audioBar) audioBar.load();
  };

  const previousSong = () => {
    updateIndex(currentIndex - 1);
    const audioBar = document.querySelector(
      ".card__audio-bar"
    ) as HTMLVideoElement;
    if (audioBar) audioBar.load();
  };

  const saveSong = (id: string) => {
    const savedTracks = getStorageData("saved_tracks");

    if (savedTracks && savedTracks.includes(id)) {
      setIsError(true);
      setTimeout(function() {
        setIsError(false);
      }, 2000);
      return;
    }

    const result = updateStorageData("saved_tracks", id);

    if (result) {
      setIsSongSaved(true);
      setTimeout(function() {
        setIsSongSaved(false);
      }, 2000);
    }
  };

  const displayGenres = () => {
    const genres = getStorageData("selected_genres");

    return genres.reduce(
      (acc: string[], value: string, index: number, arr: string[]) => {
        if (index === arr.length - 1) return acc.concat(value);
        return acc.concat(`${value}, `);
      },
      ""
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 content-wrapper">
      {isSongSaved ? (
        <Alert message={"Song was successfuly saved!"} isSuccess={true} />
      ) : null}
      {isError ? (
        <Alert message={"You already saved this song!"} isSuccess={false} />
      ) : null}
      <Query
        query={GET_TRACKS_QUERY}
        variables={{ selectedGenres: getStorageData("selected_genres") }}
      >
        {(properties: any) => {
          if (properties.loading) return <h4>LOADING...</h4>;
          if (properties.error) {
            switch (properties.error) {
              case UNAUTHORIZED:
                props.history.push({
                  pathname: "/",
                  state: { authError: true }
                });
                break;
            }
            props.history.push({ pathname: "/", state: { authError: true } });
            return null;
          } else {
            return (
              <div className="content-wrapper d-flex flex-column align-items-center">
                <div className="heading__secondary mb-3 text-primary">
                  <span className="text-white">Current Genres:</span>{" "}
                  {displayGenres()}
                </div>
                <SwipeCard
                  nextSong={() => nextSong()}
                  previousSong={() => previousSong()}
                  image={
                    properties.data.suggestedTracks[currentIndex].album.images
                      .url
                  }
                />

                <CardBody
                  artists={
                    properties.data.suggestedTracks[currentIndex].artists
                  }
                  name={properties.data.suggestedTracks[currentIndex].name}
                  preview_url={
                    properties.data.suggestedTracks[currentIndex].preview_url
                  }
                />
                <Button
                  type={"primary"}
                  title={"Add to playlist"}
                  action={() =>
                    saveSong(properties.data.suggestedTracks[currentIndex].id)
                  }
                  colors={"bg-primary text-white"}
                />
              </div>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default Dashboard;
