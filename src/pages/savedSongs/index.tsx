import React, { useEffect, Fragment, useState } from "react";
import gql from "graphql-tag";
import { Button } from "../../components/button";
import { client } from "../../App";
import { Card } from "./card";
import { Modal } from "../../components/modal";
import { PlaylistModalBody } from "./playlistModalBody";
import { CardBody } from "../../components/cardBody";
import { Alert } from "../../components/alert";
import { Query } from "react-apollo";
import { getStorageData, setStorageData } from "../../utilities/localStorage";
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

const SavedSongs = (props: any) => {
  const [username, setUsername] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState({ id: "", name: "" });
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [songIds, setSongIds] = useState("");
  const [savedSongs, setSavedSongs] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [isSavedPlaylist, setIsSavedPlaylist] = useState("");

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
        setCurrentPlaylist(result.data.userPlaylists[0]);
        setUserPlaylists(result.data.userPlaylists);
      })
      .catch(err => console.log("ERROR", err));
  };

  const addToPlaylistQuery = () => {
    if (currentPlaylist.id)
      client
        .query({
          query: gql`
            query addToPlaylist($songIds: [String!]!, $playlist_id: String!) {
              addToPlaylist(songIds: $songIds, playlist_id: $playlist_id) {
                snapshot_id
              }
            }
          `,
          variables: {
            songIds: getStorageData("saved_tracks"),
            playlist_id: currentPlaylist.id
          }
        })
        .then(result => {
          setIsSavedPlaylist(result.data.addToPlaylist.snapshot_id);
          setTimeout(function() {
            setIsSavedPlaylist("");
          }, 2000);
        })
        .catch(err => console.log("ERROR", err));
  };

  const removeSong = (trackId: string) => {
    const songIds = getStorageData("saved_tracks");
    const newSongIds = songIds.filter((item: string) => item !== trackId);
    const newSongTracks = savedSongs.filter((item: any) => item.id !== trackId);
    setStorageData("saved_tracks", newSongIds);
    setSavedSongs(newSongTracks);
  };

  const handleSelectChange = (value: { name: string; id: string }) => {
    setCurrentPlaylist(value);
  };

  const renderSongs = (
    songs: {
      id: string;
      album: { images: { url: string } };
      artists: { name: string }[];
      preview_url: string;
      name: string;
    }[]
  ) => {
    return songs.map(
      (
        song: {
          id: string;
          album: { images: { url: string } };
          artists: { name: string }[];
          preview_url: string;
          name: string;
        },
        index: number
      ) => (
        <div className="d-flex justify-content-center align-items-center flex-column col-12 col-md-6 col-lg-4 p-3">
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
          <div
            className="heading__secondary-small mt-2"
            style={{ color: "rgb(255, 78, 80)", cursor: "pointer" }}
            onClick={() => {
              console.log("song", song);
              removeSong(song.id);
            }}
          >
            Remove this song
          </div>
        </div>
      )
    );
  };

  const getPlaylistId = (name: string): string => {
    const playlist: { name: string; id: string }[] = userPlaylists.filter(
      (item: { name: string; id: string }) => item.name === name
    );
    return playlist[0].id;
  };

  const renderPlaylists = (arr: { name: string; id: string }[]) =>
    arr.map((item, index) => <option key={index}>{item.name}</option>);

  const changeModalState = () => {
    return setModalState(!modalState);
  };

  return songIds ? (
    <Query query={SAVED_TRACKS_QUERY} variables={{ savedTracks: songIds }}>
      {(properties: any) => {
        if (properties.loading) return <div>Loading...</div>;
        if (properties.error) {
          props.history.push({ pathname: "/", state: { authError: true } });
            return null;
        } else {
          !savedSongs.length && setSavedSongs(properties.data.savedTracks);
          return username && currentPlaylist ? (
            <Fragment>
              {isSavedPlaylist ? (
                <Alert
                  message={
                    "Selected songs were successfully added to your playlist"
                  }
                  isSuccess={true}
                />
              ) : null}
              <Modal show={modalState}>
                <PlaylistModalBody
                  name={currentPlaylist.name}
                  changeModalState={() => changeModalState()}
                  addToPlaylist={() => addToPlaylistQuery()}
                />
              </Modal>
              <div className="d-flex justify-content-center align-items-center mt-5 mb-3 flex-column">
                <div className="heading__primary mb-3">
                  Choose your playlist
                </div>
                <select
                  className="select-input"
                  onChange={e =>
                    handleSelectChange({
                      name: e.target.value,
                      id: getPlaylistId(e.target.value)
                    })
                  }
                >
                  {renderPlaylists(userPlaylists)}
                </select>
                <Button
                  type={"primary"}
                  title={`Add these songs to "${currentPlaylist.name}"`}
                  action={() => {
                    changeModalState();
                  }}
                  colors={{
                    backgroundColor: "rgb(255, 78, 80)",
                    color: "#fff"
                  }}
                />
              </div>
              <div className="row">{renderSongs(savedSongs)}</div>
            </Fragment>
          ) : (
            <div>Please login</div>
          );
        }
      }}
    </Query>
  ) : null;
};

export default SavedSongs;
