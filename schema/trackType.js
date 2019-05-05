const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require("graphql");

const TrackType = new GraphQLObjectType({
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

module.exports = TrackType;
