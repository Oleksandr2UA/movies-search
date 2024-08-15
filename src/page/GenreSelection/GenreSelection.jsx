import "../GenreSelection/GenreSelection.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { genres } from "../../components/helpers/GenresData/genresData";

const GenreSelection = () => {
  const location = useLocation();

  return (
    <div className="genre-selection-container">
      <h1>Select a Genre</h1>
      <div className="genres-list">
        {genres.map(({ id, name }) => (
          <Link
            to={`/genres/${id}`}
            state={{ from: location }}
            key={id}
            className="genre-link"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreSelection;
