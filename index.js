const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
