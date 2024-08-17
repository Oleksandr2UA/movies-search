import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getGenres } from "../helpers/GenresData/getGenres";
import { sortFilms } from "../helpers/SortFilms";
import "./MoviePreview.css";

export const MoviePreview = ({ films, character, movieId }) => {
  const sortedFilms = sortFilms(films);
  // console.log(sortedFilms);
  console.log("films: in preview ", films);
  const location = useLocation();

  return (
    <>
      {films.length !== 0 &&
        sortedFilms.map(
          ({
            poster_path,
            release_date,
            title,
            vote_average,
            vote_count,
            overview,
            id,
            character: characterFilm, // So it wouldnt be the same as prop character to check if i render data from actorDetails of GenreDetails
            genre_ids,
            genres,
          }) => {
            const path = `/movies/${id}`;
            const rating = vote_average.toFixed(1);
            console.log("genre_ids", genre_ids);
            console.log("genres", genres);
            // Get a string of genres
            //? Check for selected films, as it has now genres=[{id,name}] not genres_ids=[1,2]
            const genresArr = genre_ids
              ? getGenres(genre_ids)
              : getGenres(genres.map((genre) => genre.id));
            return (
              <Link
                to={path}
                state={{ from: location }}
                className={
                  movieId && id === Number(movieId)
                    ? "actor-details-link active-link"
                    : "actor-details-link"
                }
                key={id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  alt="banner"
                  className="actor-poster"
                />
                <div className="actor-info">
                  <span className="actor-watched">
                    People watched: {vote_count}
                  </span>
                  <h2 className="movie-title">{title}</h2>
                  {character ? (
                    <h4 className="character-name">
                      Character: {characterFilm}
                    </h4>
                  ) : (
                    <div className="genres-wrapper">
                      {genresArr.map(({ id, name }) => (
                        <p key={id} className="genre-wrapper">
                          <span className="genre-name">{name} </span>
                        </p>
                      ))}
                    </div>
                  )}
                  <p className="rating">
                    {rating >= 7 ? (
                      <FaStar key={id} className="star" />
                    ) : rating >= 5 ? (
                      <FaStarHalfAlt key={id} className="star" />
                    ) : (
                      <FaRegStar key={id} className="empty-star" />
                    )}
                    {rating + "/10"}
                  </p>

                  <p className="release-date">{release_date}</p>
                  <p className="overview">{overview}</p>
                </div>
              </Link>
            );
          }
        )}
    </>
  );
};
