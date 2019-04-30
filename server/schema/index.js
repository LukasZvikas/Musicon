const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

const TrackSuggestionType = new GraphQLObjectType({
  name: "trackSuggestions",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(params, args) {
        return params.artists.map(artist => {
          return artist;
        });
      }
    },
    preview_url: { type: GraphQLString },
    album: {
      type: ImageType
    }
  })
});

const ArtistType = new GraphQLObjectType({
  name: "artists",
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const ImageType = new GraphQLObjectType({
  name: "image",
  fields: () => ({
    images: {
      type: new GraphQLObjectType({
        name: "url",
        fields: () => ({
          url: {
            type: GraphQLString,
            resolve(params, args) {
              return params[0].url;
            }
          }
        })
      })
    }
  })
});

const SelectedGenresType = new GraphQLObjectType({
  name: "selectedGenres",
  fields: () => ({
    genre: {
      type: GraphQLString,
      resolve(parent, args) {
        console.log("args", args);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    tracks: {
      type: new GraphQLList(TrackSuggestionType),
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
                  "Bearer BQDwmEXMzRi8Uj_jVwYvBIAo2gjIh6M5dYAZLjSe_hVHxF0wNPQ6f6H1q2SESxozQ6AGqls7yBq0E39egG-iiNr-q9NIM2-3jgyctKNcz_hT1KjplcapUmz8k92tJVlbhYzzXLuBFSQ"
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
