const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require("graphql");
const axios = require("axios");
const TrackType = require("./trackType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    suggestedTracks: {
      type: new GraphQLList(TrackType),
      args: {
        selectedGenres: { type: new GraphQLList(GraphQLString) }
      },
      async resolve(parent, args) {
        const genres = args.selectedGenres.reduce((acc, value) => {
          if (value === "R&B") return acc.concat("r-n-b,");
          else {
            return acc.concat(`${value.toLowerCase()},`);
          }
        }, "");
        try {
          const result = await axios.get(
            `https://api.spotify.com/v1/recommendations?limit=50&market=US`,
            {
              params: {
                seed_genres: genres
              },
              headers: {
                Authorization:
                  "Bearer BQDSwzyiomKlKXHQPVO85Swr-KidUvcFzheRgzgxmZlBbSR_eLlZYE2FCWkNn5TBG5mc4Fm1sUiawDWOhqnRhmW63qWxzzagCdPJ6c60wFujWqzVi1wNT0bZAVICj7Iqd-TUuO7-0XI"
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
      async resolve(parent, args) {
        console.log("ARGS", args);
        const songIds = args.savedTracks.reduce((acc, value, index, arr) => {
          if (index === arr.length - 1) return acc.concat(value);
          return `${acc.concat(value)},`;
        }, "");

        console.log("SONGS", songIds);
        try {
          const result = await axios.get(`https://api.spotify.com/v1/tracks`, {
            params: {
              ids: songIds
            },
            headers: {
              Authorization:
                "Bearer BQDSwzyiomKlKXHQPVO85Swr-KidUvcFzheRgzgxmZlBbSR_eLlZYE2FCWkNn5TBG5mc4Fm1sUiawDWOhqnRhmW63qWxzzagCdPJ6c60wFujWqzVi1wNT0bZAVICj7Iqd-TUuO7-0XI"
            }
          });
          console.log("RESULT", result);
          return result.data.tracks;
        } catch (err) {
          console.log(err);
          throw new Error("problem occurred while fetching artists");
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
