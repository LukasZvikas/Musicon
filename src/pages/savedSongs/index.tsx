import React, { useEffect, Fragment, useState } from "react";
import gql from "graphql-tag";
import { Button } from "../../components/button";
import { client } from "../../App";
import { Card } from "./card";
import { Modal } from "../../components/modal";
import { PlaylistModalBody } from "./playlistModalBody";
import { CardBody } from "../../components/cardBody";
import { Query } from "react-apollo";
import { getStorageData } from "../../utilities/localStorage";
import "./SavedSongs.css";

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

const SavedSongs = () => {
  const [username, setUsername] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [songIds, setSongIds] = useState("");
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const ids = getStorageData("saved_tracks");
    setSongIds(ids);
    client
      .query({
        query: gql`
          {
            userDetails {
              display_name
            }
          }
        `
      })
      .then(({ data: { userDetails: { display_name } } }) => {
        playlistQuery(display_name);
        setUsername(display_name);
      })
      .catch(err => console.log("ERROR", err));
  }, []);

  const playlistQuery = (username: string) => {
    client
      .query({
        query: gql`
          query userPlaylists($username: String!) {
            userPlaylists(username: $username) {
              id
              name
            }
          }
        `,
        variables: { username }
      })
      .then(result => {
        setCurrentPlaylist(result.data.userPlaylists[0].name);
        setUserPlaylists(result.data.userPlaylists);
      })
      .catch(err => console.log("ERROR", err));
  };

  const handleSelectChange = (value: string) => {
    setCurrentPlaylist(value);
  };

  const renderSongs = (songs: any) => {
    return songs.map((song: any, index: number) => (
      <div className="d-flex justify-content-center align-items-center flex-column col-12 col-sm-6 col-md-4 p-3">
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

  const renderPlaylists = (arr: { name: string; id: string }[]) =>
    arr.map((item, index) => <option key={index}>{item.name}</option>);

  const changeModalState = () => {
    return setModalState(!modalState);
  };

  return songIds ? (
    <Query query={SAVED_TRACKS_QUERY} variables={{ savedTracks: songIds }}>
      {(props: any) => {
        if (props.loading) return <div>Loading...</div>;
        if (props.error) console.log("error", props.error);
        else {
          return username ? (
            <Fragment>
              <Modal show={modalState}>
                <PlaylistModalBody name={currentPlaylist} changeModalState={() => changeModalState()} />
              </Modal>
              <div className="d-flex justify-content-center align-items-center mt-5 mb-3 flex-column">
                <div className="heading__primary mb-3">
                  Choose your playlist
                </div>
                <select
                  className="select-input"
                  onChange={e => handleSelectChange(e.target.value)}
                >
                  {renderPlaylists(userPlaylists)}
                </select>
                <Button
                  type={"primary"}
                  title={`Add these songs to "${currentPlaylist}"`}
                  action={() => {
                    changeModalState();
                  }}
                  colors={{
                    backgroundColor: "rgb(255, 78, 80)",
                    color: "#fff"
                  }}
                />
              </div>

              <div className="row">{renderSongs(props.data.savedTracks)}</div>
            </Fragment>
          ) : null;
        }
      }}
    </Query>
  ) : null;
};

export default SavedSongs;
