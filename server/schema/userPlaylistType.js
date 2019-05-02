const { GraphQLString, GraphQLObjectType, GraphQlList } = require("graphql");

const UserPlayListType = new GraphQLObjectType({
  fields: () => ({
    items: {
      type: PlaylistIdType,
      resolve(parent, args) {
        console.log("args", args);
      }
    }
  })
});

const PlaylistIdType = new GraphQLObjectType({
  fields: () => ({
    id: {
      type: GraphQLString
    }
  })
});
