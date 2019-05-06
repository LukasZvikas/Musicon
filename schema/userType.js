const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "userDetails",
  fields: () => ({
    display_name: { type: GraphQLString }
  })
});

module.exports = UserType;
