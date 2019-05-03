import React, { useState } from "react";
import {
  updateStorageData,
  getStorageData
} from "../../utilities/localStorage";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SwipeCard } from "./swipeCard";
import { CardBody } from "../../components/cardBody";
import { Button } from "../../components/button";
import { Alert } from "../../components/alert";
import "../../Shared.css";
import "./Dashboard.css";

const TRACKS_QUERY = gql`
  query TracksQuery($selectedGenres: [String!]!) {
    suggestedTracks(selectedGenres: $selectedGenres) {
      id
      name
      artists {
        name
      }
      preview_url
      album {
        images {
          url
        }
      }
    }
  }
`;

const Dashboard = props => {
  const [currentIndex, updateIndex] = useState(0);
  const [isSongSaved, setIsSongSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  const nextSong = () => {
    updateIndex(currentIndex + 1);
    document.querySelector(".card__audio-bar").load();
  };

  const saveSong = id => {
    const savedTracks = getStorageData("saved_tracks");

    if (savedTracks.includes(id)) {
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

  const previousSong = () => {
    updateIndex(currentIndex - 1);
    document.querySelector(".card__audio-bar").load();
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      {isSongSaved ? (
        <Alert message={"Song was successfuly saved!"} isSuccess={true} />
      ) : null}
      {isError ? (
        <Alert message={"You already saved this song!"} isSuccess={false} />
      ) : null}
      <Query
        query={TRACKS_QUERY}
        variables={{ selectedGenres: props.location.state }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>LOADING...</h4>;
          if (error) {
            props.history.push({ pathname: "/", state: { authError: true } });
            return null;
          } else {
            return (
              <div className="content-wrapper d-flex flex-column align-items-center">
                <SwipeCard
                  nextSong={() => nextSong()}
                  previousSong={() => previousSong()}
                  image={data.suggestedTracks[currentIndex].album.images.url}
                />

                <CardBody
                  artists={data.suggestedTracks[currentIndex].artists}
                  name={data.suggestedTracks[currentIndex].name}
                  preview_url={data.suggestedTracks[currentIndex].preview_url}
                />
                <Button
                  type={"primary"}
                  title={"Add to playlist"}
                  action={() => saveSong(data.suggestedTracks[currentIndex].id)}
                  colors={{
                    backgroundColor: "rgb(255, 78, 80)",
                    color: "#fff"
                  }}
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
