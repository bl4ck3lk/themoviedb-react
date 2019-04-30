import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card.component";
import LoaderComponent from "../../common/loader.component";
import "./movie-list.css";

const MovieListComponent = ({ movies, isLoading }) => {
  const movieColumns = movies
    ? movies.map(movie => (
        <Col className="movie-column" key={movie.name} xs={4} sm={4} md={3} lg={3}>
          <MovieCard className="movie" movie={movie} />
        </Col>
      ))
    : null;

  return (
    <Row>
      {movieColumns}
      <LoaderComponent isLoading={isLoading} />
    </Row>
  );
};

export default MovieListComponent;
