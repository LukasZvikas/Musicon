const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require("graphql");
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
          console.log(err);
          throw new Error("problem occurred while fetching artists");
        }
      }
    },
    savedTracks: {
      type: new GraphQLList(TrackType),
      args: {
        savedTracks: { type: new GraphQLList(GraphQLString) }
      },
      async resolve(parent, args, req) {
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
          throw new Error("problem occurred while fetching artists");
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
          throw new Error("problem occurred while fetching user's data");
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
          throw new Error("problem occurred while fetching user playlist");
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

          console.log("URI", uris);
          console.log("ID", token);

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
          console.log("RESULT", result.data);
          return result.data;
        } catch (err) {
          console.log("ERR", err);
          throw new Error(
            "problem occurred while adding songs to the playlist"
          );
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
