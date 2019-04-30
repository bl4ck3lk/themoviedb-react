import React, { Component } from "react";
import { AppBar } from "material-ui";
import Container from "react-bootstrap/Container";
import { updateMoviePictureUrls } from "../movie-browser.helpers";
import { Row } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./movie-detail.css";
import { connect } from "react-redux";
import { getMovieDetails } from "../movie-browser.actions";
import _ from "lodash";

class MovieDetailComponent extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.getMovieDetails(params.id);
  }

  formatReleaseDate = date => {
    // the format from the API is yyyy-mm-dd
    if (date) {
      const year = date.split("-")[0];
      return year;
    } else {
      return date;
    }
  };

  render() {
    const movie = updateMoviePictureUrls(this.props.movie);

    return (
      <div>
        <MuiThemeProvider>
          <AppBar position="static" title={movie.title} />
          <Container className="top-container">
            <Row className="top-row">
              <div className="img-div">
                <img className="bg-image" src={movie.poster_path} />
              </div>
              <div className="top-info">
                <h2 className="date-text">
                  {this.formatReleaseDate(movie.release_date)}
                </h2>
                <h3 className="runtime-text">{movie.runtime} min</h3>
                <p className="votes-text">{movie.vote_average}/10</p>
                <button type="button" className="btn btn-primary">
                  Mark as Favorite
                </button>
              </div>
            </Row>
          </Container>
          <Container className="bottom-container">
            <div>
              <p className="overview-text">{movie.overview}</p>
            </div>
          </Container>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  state => ({
    movie: _.get(state, "movieBrowser.movieDetails.response", {})
  }),
  { getMovieDetails }
)(MovieDetailComponent);
