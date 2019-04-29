const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
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

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    tracks: {
      type: new GraphQLList(TrackSuggestionType),
      async resolve(parent, args) {
        console.log("HELLO");
        try {
          const result = await axios.get(
            "https://api.spotify.com/v1/recommendations?limit=30&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=hip-hop&seed_tracks=0c6xIDDpzE81m2q797ordA",
            {
              headers: {
                Authorization:
                  "Bearer BQAlWAxoRZw8t7QEILY1s4vnjd8r7GIbDPTxZL81VMvd5aDc1FN91XjjNYB8wl1JvwXOpmw-0MX9DD0qsdI2NtrZIppJs0EIm7eeMEMdagAjn0DiWssugNbLp4bWwA0MEvLYzKXTLII"
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
