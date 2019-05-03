import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./components/header";
import Quiz from "./pages/quiz";
import Explore from "./pages/explore";
import SavedSongs from "./pages/savedSongs";
import { getStorageData } from "./utilities/localStorage";
import "./App.css";

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  headers: {
    token: getStorageData("token")
  }
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Quiz} />
          <Route path="/explore" component={Explore} />
          <Route path="/saved" component={SavedSongs} />
          <Route path="/*" component={Quiz} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
