import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from 'react-redux'
import store from './redux/store'
import "./index.css";
import App from "./App";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

ReactDOM.render(
  // <Provider store={store}>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  // </Provider>,
  document.getElementById("root"),
);
