import React, { Component } from "react";
import MovieBrowser from "./modules/movie-browser/movie-browser.container";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

class App extends Component {
  render() {
    return (
        <div>
          <MuiThemeProvider>
            <MovieBrowser />
          </MuiThemeProvider>
        </div>
      // Provides the Material UI theme to child components

    );
  }
}

export default App;
