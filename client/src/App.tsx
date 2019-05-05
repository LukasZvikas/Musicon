import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Header from "./components/header";
import Quiz from "./pages/quiz";
import Explore from "./pages/explore";
import SavedSongs from "./pages/savedSongs";
import { getStorageData } from "./utilities/localStorage";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = getStorageData("token");
  return {
    headers: {
      ...headers,
      token
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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
