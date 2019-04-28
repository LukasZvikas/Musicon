const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require("graphql");
const axios = require("axios");

const TrackSuggestions = new GraphQLObjectType({
  name: "SongSuggestion",
  fields: () => ({
    is_playable: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    tracks: {
      type: new GraphQLList(TrackSuggestions),
      async resolve(parent, args) {
        console.log("HERE");
        try {
          const result = await axios.get(
            "https://api.spotify.com/v1/recommendations?limit=1&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",
            {
              headers: {
                Authorization:
                  "Bearer BQClD-W8GLeXIh9pa0UiIw2abKA4nnoWlYYrGbM5Ji1yvuUVw159PamNRbZNJVbYhqusnEV31vSw25isev6ZG8XC-cn8nAnHPIjp0i8CCFrNE9gHuseLL51TIST4mZ5J_C9iueTBe1k"
              }
            }
          );
          
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
