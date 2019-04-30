import React, { Component } from "react";
import { Card, CardMedia } from "material-ui";
import { Link } from "react-router-dom";
import "./movie-card.css";

class MovieCardComponent extends Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const { movie } = this.props;
    // The subtitle won't render if it's null

    return (
      <Link to={`/movie/${movie.id}`} key={movie.id}>
        <Card
          className="card"
          onMouseOver={() => this.setState({ isMouseOver: true })}
          onMouseLeave={() => this.setState({ isMouseOver: false })}
        >
          <CardMedia
            className="card-media"
            // overlay={<CardTitle className="cardTitle" title={movie.title} subtitle={subtitle} />}
          >
            <img className="bg-image" src={movie.poster_path} alt={movie.name}/>
          </CardMedia>
        </Card>
      </Link>
    );
  }
}

export default MovieCardComponent;
