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
            "https://api.spotify.com/v1/recommendations?limit=50&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=hip-hop&target_popularity=50&seed_tracks=0c6xIDDpzE81m2q797ordA",
            {
              headers: {
                Authorization:
                  "Bearer BQCfkDyvc2Fd1eNUra74UgPjJLfaPBCEBhxZXfcSPdshk8W9bR8fJ8A-8gVtfqVeyvw64JlZg4ZV1IPjbsU2G2HDV8ASeeu3NZPx6sZTsg4NEv2-RIcqgvC324WtJz_EKGddaFSv6HY"
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
