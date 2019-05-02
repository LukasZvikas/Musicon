const { GraphQLString, GraphQLObjectType, GraphQlList } = require("graphql");

const UserPlayListType = new GraphQLObjectType({
  name: "userPlaylists",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
});

module.exports = UserPlayListType;
