import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { AppBar } from "material-ui";
// e.g. { getTopMovies, ... }
import * as movieActions from "./movie-browser.actions";
import * as movieHelpers from "./movie-browser.helpers";
import MovieList from "./movie-list/movie-list.component";
import * as scrollHelpers from "../common/scroll.helpers";
import "./movie-browser.css";

class MovieBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovies: [],
      currentPage: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
    this.setState({
      currentMovies: this.props.topMovies.response
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.movieSearch !== this.props.movieSearch) {
      console.log("SEARCH UPDATE");
      this.setState({
        currentMovies: this.props.movieSearch.response
      });
    }
    if (prevProps.topMovies !== this.props.topMovies) {
      console.log("TOP UPDATE");
      this.setState({
        currentMovies: this.props.topMovies.response
      });
    }
  }

  handleScroll() {
    const { topMovies } = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > 0.8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        // this.setState({ currentPage: nextPage });
        this.setState({
          currentPage: nextPage,
          currentMovies: this.props.topMovies.response
        });
      }
    }
  }

  handleSearchInput(event) {
    if (event.target.value.length > 0) {
      // await this.setState({currentMovies: []});
      event.preventDefault()
      console.log(event.target.value);
      console.log("PROPS", this.props);
      this.props.searchMovies(event.target.value, 1);
      // await this.setState({
      //   currentMovies: movieHelpers.getMoviesList(
      //       this.props.movieSearch.response
      //   )
      // });
    }
  };

  render() {
    const { currentMovies } = this.state;
    const { topMovies, movieSearch } = this.props;
    if (currentMovies && currentMovies.results) {
      console.log("[currentMovies]", currentMovies);
      console.log("[currentMovies]", currentMovies.results.length);
    }

    //
    // let movies = [];
    // if (movieSearch.response && movieSearch.response.results.length > 0) {
    //   movies = movieHelpers.getMoviesList(movieSearch.response);
    // } else {
    //   const movies = movieHelpers.getMoviesList(topMovies.response);
    // }
    // const movies = movieHelpers.getMoviesList(currentMovies);

    return (
      <div>
        <AppBar title="Movie Browser" />
        <Container>
          <Row>
            <form className="form-inline active-cyan-3 active-cyan-4">
              <i className="fas fa-search" aria-hidden="true" />
              <input
                onChange={this.handleSearchInput}
                className="form-control form-control-md ml-12 w-100"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </Row>
          <Row>
            <MovieList movies={movieHelpers.getMoviesList(currentMovies)} isLoading={topMovies.isLoading} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  state => ({
    topMovies: state.movieBrowser.topMovies,
    movieSearch: state.movieBrowser.movieSearch
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);
