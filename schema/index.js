const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require("graphql");
const {
  SUGGESTED_TRACKS_ERROR,
  SAVED_TRACKS_ERROR,
  USER_DETAILS_ERROR,
  USER_PLAYLISTS_ERROR,
  ADD_TO_PLAYLIST_ERROR,
  UNAUTHORIZED
} = require("../errorTypes");
const axios = require("axios");
const TrackType = require("./trackType");
const UserType = require("./userType");
const UserPlaylistList = require("./userPlaylistType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    suggestedTracks: {
      type: new GraphQLList(TrackType),
      args: {
        selectedGenres: {
          type: new GraphQLList(GraphQLString)
        }
      },
      async resolve(parent, args, req) {
        const token = req.headers.token;
        const genres = args.selectedGenres.reduce((acc, value) => {
          if (value === "R&B") return acc.concat("r-n-b,");
          else {
            return acc.concat(`${value.toLowerCase()},`);
          }
        }, "");
        try {
          const result = await axios.get(
            `https://api.spotify.com/v1/recommendations?limit=50&market=US&min_popularity=60&max_popularity=100`,
            {
              params: {
                seed_genres: genres
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          return result.data.tracks.filter(
            ({ preview_url }) => preview_url !== null
          );
        } catch (err) {
          if (err.message === UNAUTHORIZED) throw new Error(UNAUTHORIZED);
          throw new Error(SUGGESTED_TRACKS_ERROR);
        }
      }
    },
    savedTracks: {
      type: new GraphQLList(TrackType),
      args: {
        savedTracks: { type: new GraphQLList(GraphQLString) }
      },
      async resolve(parent, args, req, res) {
        const token = req.headers.token;
        const songIds = args.savedTracks.reduce((acc, value, index, arr) => {
          if (index === arr.length - 1) return acc.concat(value);
          return `${acc.concat(value)},`;
        }, "");
        try {
          const result = await axios.get(`https://api.spotify.com/v1/tracks`, {
            params: {
              ids: songIds
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return result.data.tracks;
        } catch (err) {
          if (err.message === UNAUTHORIZED) throw new Error(UNAUTHORIZED);
          throw new Error(SAVED_TRACKS_ERROR);
        }
      }
    },
    userDetails: {
      type: UserType,
      async resolve(parent, args, req) {
        const token = req.headers.token;
        try {
          const result = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return result.data;
        } catch (err) {
          throw new Error(USER_DETAILS_ERROR);
        }
      }
    },
    userPlaylists: {
      type: new GraphQLList(UserPlaylistList),
      args: {
        username: {
          type: GraphQLString
        }
      },
      async resolve(parent, args, req) {
        const token = req.headers.token;
        try {
          const result = await axios.get(
            `https://api.spotify.com/v1/users/${args.username}/playlists`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          return result.data.items;
        } catch (err) {
          throw new Error(USER_PLAYLISTS_ERROR);
        }
      }
    },
    addToPlaylist: {
      type: new GraphQLObjectType({
        name: "addToPlaylist",
        fields: () => ({
          snapshot_id: { type: GraphQLString }
        })
      }),
      args: {
        playlist_id: {
          type: GraphQLString
        },
        songIds: {
          type: new GraphQLList(GraphQLString)
        }
      },
      async resolve(parent, args, req) {
        const token = req.headers.token;

        try {
          const uris = args.songIds.reduce((acc, value, index, arr) => {
            if (index === arr.length - 1)
              return acc.concat(`spotify:track:${value}`);
            return acc.concat(`spotify:track:${value},`);
          }, "");

          const result = await axios(
            `https://api.spotify.com/v1/playlists/${args.playlist_id}/tracks`,
            {
              method: "POST",
              params: { uris },
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          );
          return result.data;
        } catch (err) {
          throw new Error(ADD_TO_PLAYLIST_ERROR);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
