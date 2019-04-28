const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require('express-graphql');
const schema = require("./schema");

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
