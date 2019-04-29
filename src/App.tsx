import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./components/header";
import Quiz from "./pages/quiz";
import Dashboard from "./pages/dashboard/index.js";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = ({}) => {
  return (
    <ApolloProvider client={client}>
      {/* <Header /> */}
      {/* <Quiz /> */}
      <Dashboard />
    </ApolloProvider>
  );
};

export default App;
