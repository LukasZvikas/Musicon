import React, { useState, Fragment } from "react";
import { updateStorageData } from "../../utilities/localStorage";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SwipeCard } from "./swipeCard";
import { CardBody } from "../../components/cardBody";
import { Button } from "../../components/button";
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

  const nextSong = () => {
    updateIndex(currentIndex + 1);
    document.querySelector(".card__audio-bar").load();
  };

  const previousSong = () => {
    updateIndex(currentIndex - 1);
    document.querySelector(".card__audio-bar").load();
  };

  console.log("props", props.location.state);
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <Query
        query={TRACKS_QUERY}
        variables={{ selectedGenres: props.location.state }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>LOADING...</h4>;
          if (error) console.log("error", error);
          else {
            console.log("DATA", data);
            return (
              <Fragment>
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
                  action={() =>
                    updateStorageData(
                      "saved_tracks",
                      data.suggestedTracks[currentIndex].id
                    )
                  }
                  fill={true}
                />
              </Fragment>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default Dashboard;
