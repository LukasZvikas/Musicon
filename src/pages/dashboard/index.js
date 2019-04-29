import React, { useState, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card } from "./card/Card";
import { Button } from "../../components/button";
import "../../Shared.css";
import "./Dashboard.css";

// const songData = [
//   {
//     songName: "ZEZE",
//     artists: ["Kodak Black", "Offset", "Travis Scott"],
//     preview:
//       "https://p.scdn.co/mp3-preview/6ccc75509be729ffb01b1df3a8183e4e88dc6303?cid=774b29d4f13844c495f206cafdad9c86"
//   },
//   {
//     songName: "SICKO MODE",
//     artists: ["Travis Scott", "Drake"],
//     preview:
//       "https://p.scdn.co/mp3-preview/1c3c01c64477b356e28a652b6447f4ef96689a71?cid=774b29d4f13844c495f206cafdad9c86"
//   }
// ];

const TRACKS_QUERY = gql`
  query TracksQuery {
    tracks {
      id
      name
      artists {
        name
      }
      preview_url
    }
  }
`;

const Dashboard = () => {
  const [currentIndex, updateIndex] = useState(0);

  const nextSong = () => {
    updateIndex(currentIndex + 1);
    document.querySelector(".dashboard__video").load();
  };

  const previousSong = () => {
    updateIndex(currentIndex - 1);
    document.querySelector(".dashboard__video").load();
  };

  const renderArtists = arr => {
    return arr.map((artist, index) => {
      if (index === arr.length - 1) return artist.name;
      return artist + ", ";
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <Query query={TRACKS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>LOADING...</h4>;
          if (error) console.log("error", error);
          else {
            console.log("DATA", data);
            return (
              <Fragment>
                <Card
                  nextSong={() => nextSong()}
                  previousSong={() => previousSong()}
                />
                <div className="dashboard__heading-wrapper mb-2 mt-2">
                  <div className="heading__primary m-1 text-center">
                    {data.tracks[currentIndex].name}
                  </div>
                  <div className="heading__secondary mt-2 text-white">
                    {renderArtists(data.tracks[currentIndex].artists)}
                  </div>
                  <video className="dashboard__video" controls name="media">
                    <source
                      src={`${data.tracks[currentIndex].preview_url}`}
                      type="audio/mpeg"
                    />
                  </video>
                </div>

                <Button
                  type={"primary"}
                  title={"Add to playlist"}
                  action={() => {}}
                  fill={"rgb(255, 78, 80)"}
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
