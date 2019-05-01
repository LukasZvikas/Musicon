import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./components/header";
import Quiz from "./pages/quiz";
import Dashboard from "./pages/dashboard/index.js";
import SavedSongs from "./pages/savedSongs";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = ({}) => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          {/* <Header /> */}
          <Route path="/" exact component={Quiz} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/saved" component={SavedSongs} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
