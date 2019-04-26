import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {AppBar, CardMedia, Dialog, Toolbar} from "material-ui";
import Loader from "../../common/loader.component";
import Container from "react-bootstrap/Container";
import { updateMoviePictureUrls } from "../movie-browser.helpers";
import _ from "lodash";
import { closeMovieModal } from "../movie-modal/movie-modal.actions";
import * as movieService from "../movie-browser.service";
import {Row} from "react-bootstrap";
import MovieList from "../movie-list/movie-list.component";
import MovieModal from "../movie-modal/movie-modal.container";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./movie-detail.css";


class MovieDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: null
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.getDetails(params.id);
  }

  getDetails = movieId => {
    console.log("MOVIE ID:", movieId);
    return movieService
      .getMovieDetails({ movieId })
      .then(res => res.json())
      .then(json =>
        this.setState({ movieDetails: updateMoviePictureUrls(json) })
      );
  };

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
    const { movieDetails } = this.state;

    const movie = { ...movieDetails };
    console.log("movieDetails", movieDetails);
    const genres =
      movie && movie.genres
        ? movie.genres.map(genre => genre.name).join(", ")
        : "";
    // const releaseDate = movie.release_date.split("-")[0];
    return (

        <div>
            <MuiThemeProvider>
                <AppBar position="static" title={movie.title}/>
                <Container className="top-container">
                    <Row className="top-row">
                        <div className="img-div">
                            <img className="bg-image" src={movie.poster_path} />
                        </div>
                        {/*<h1>{movie.title}</h1>*/}
                        <div className="top-info">
                            <h2 className="date-text">{this.formatReleaseDate(movie.release_date)}</h2>
                            <h3 className="runtime-text">{movie.runtime} min</h3>
                            <p className="votes-text">{movie.vote_average}/10</p>
                            <button type="button" className="btn btn-primary">Mark as Favorite</button>
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

      // <Container autoScrollBodyContent={true} title={null}>
      //   <div>
      //     <div>
      //         <AppBar title={movie.title} />
      //       {/*<h1>{movie.title}</h1>*/}
      //       <img style={styles.bgImage} src={movie.poster_path} />
      //       <h3>{movie.runtime}</h3>
      //     </div>
      //     <h5>{genres}</h5>
      //     <p>{movie.vote_average}/10</p>
      //     <p>{movie.overview}</p>
      //     <p>Popularity: {movie.popularity}</p>
      //     <p>Budget: ${movie.budget}</p>
      //   </div>
      // </Container>
    );
  }
}
export default MovieDetailComponent;
