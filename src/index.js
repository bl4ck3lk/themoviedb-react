import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MovieDetailComponent from "./modules/movie-browser/movie-detail/movie-detail.component";
import ScrollMemory from 'react-router-scroll-memory';

// require('dotenv').config({path: __dirname + '/.env'})
require('dotenv').config()

const routing = (
    <BrowserRouter>
        <div>
            <ScrollMemory/>
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/movie/:id" component={MovieDetailComponent}/>
            </Switch>

        </div>
    </BrowserRouter>
)

ReactDOM.render(
  <Provider store={store}>
      {routing}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
