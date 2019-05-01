import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Button } from "../../components/button";
import { Card } from "./card";
import { CardBody } from "../../components/cardBody";
import { Query } from "react-apollo";
import { getStorageData } from "../../utilities/localStorage";
import axios from "axios";

const SAVED_TRACKS_QUERY = gql`
  query SavedTracks($savedTracks: [String!]!) {
    savedTracks(savedTracks: $savedTracks) {
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

const SavedSongs = ({}) => {
  const songIds = getStorageData("saved_tracks");
  console.log(songIds);

  const renderSongs = (songs: any) => {
    return songs.map((song: any, index: number) => (
      <div className="d-flex justify-content-center align-items-center flex-column col-12 col-sm-6 col-md-4">
        <Card key={index} image={song.album.images.url} />
        <CardBody
          artists={song.artists}
          preview_url={song.preview_url}
          name={song.name}
          style={{
            name: "heading__primary-small mb-2 mt-2 text-center",
            artist: "heading__secondary-small mb-4 text-center"
          }}
        />
      </div>
    ));
  };
  return songIds ? (
    <div>
      <Button
        type={"primary"}
        title={"Add to playlist"}
        action={() => {}}
        fill={true}
      />
      <Query query={SAVED_TRACKS_QUERY} variables={{ savedTracks: songIds }}>
        {(props: any) => {
          if (props.loading) return <div>Loading...</div>;
          if (props.error) console.log("error", props.error);
          else {
            console.log("data", props.data);
            return (
              <div className="row">{renderSongs(props.data.savedTracks)}</div>
            );
          }
        }}
      </Query>
    </div>
  ) : null;
};

export default SavedSongs;
