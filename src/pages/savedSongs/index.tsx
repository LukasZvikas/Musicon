import React, { useEffect, useState } from "react";
import {
  SAVED_TRACKS_QUERY,
  USER_PLAYLISTS_QUERY,
  USER_DETAILS_QUERY,
  ADD_TO_PLAYLIST_QUERY
} from "../../graphqlQueries";
import { SAVED_TRACKS_ERROR, UNAUTHORIZED } from "../../utilities/errorTypes";
import { Button } from "../../components/button";
import { client } from "../../App";
import { Card } from "./card";
import { Modal } from "../../components/modal";
import { PlaylistModalBody } from "./savedModalBody";
import { CardBody } from "../../components/cardBody";
import { Alert } from "../../components/alert";
import { Query } from "react-apollo";
import { getStorageData, setStorageData } from "../../utilities/localStorage";
import "./SavedSongs.css";
import "../../Shared.css";

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
        query: USER_DETAILS_QUERY
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
        query: USER_PLAYLISTS_QUERY,
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
          query: ADD_TO_PLAYLIST_QUERY,
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
        <div className="d-flex justify-content-center align-items-center flex-column col-12 col-md-6 col-lg-4">
          <Card key={index} image={song.album.images.url} />
          <CardBody
            artists={song.artists}
            preview_url={song.preview_url}
            name={song.name}
            style={{
              name: "heading__primary-small mb-2 mt-2 text-center",
              artist: "heading__secondary-small mb-3 text-center text-white"
            }}
          />
          <div
            className="heading__secondary-small mt-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => removeSong(song.id)}
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
          const error = properties.error.graphQLErrors[0].message;
          switch (error) {
            case SAVED_TRACKS_ERROR:
              console.log("here");
              return <div>No saved tracks yey</div>;
            case UNAUTHORIZED:
              props.history.push({ pathname: "/", state: { authError: true } });
              break;
          }

        } else {
          !savedSongs.length && setSavedSongs(properties.data.savedTracks);
          return username && currentPlaylist ? (
            <div className="content-wrapper">
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
              <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
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
                  colors={"bg-primary text-white"}
                />
              </div>
              <div className="row">{renderSongs(savedSongs)}</div>
            </div>
          ) : (
            <div>Please login</div>
          );
        }
      }}
    </Query>
  ) : null;
};

export default SavedSongs;
