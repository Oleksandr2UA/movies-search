// import { fetchFilmCredits } from "components/api/fetchFilms";
import { fetchFilmCredits } from "../api/fetchFilms";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import "../Cast/Cast.css";
import "../Loader/Loader.css";

const PLACEHOLDER =
  "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
export const Cast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  const location = useLocation();
  console.log("cast: ", location);
  useEffect(() => {
    // console.log("useeffect");
    const abortController = new AbortController();

    async function getCredits() {
      try {
        setIsLoading(true);
        const cast = await fetchFilmCredits(movieId, abortController);
        setCast(cast);
        setError(null);
      } catch (error) {
        if (error.message === "canceled") return;
        setError(`Something went wrong, if reloading page doesn't help, this films
            doesn't exist in our database`);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
    getCredits();
    return () => {
      abortController.abort();
    };
  }, [movieId]);

  return (
    <>
      <h3>Cast</h3>
      {isLoading && <Loader />}
      {!isLoading && cast.length === 0 && <Loader />}
      {error &&
        !isLoading &&
        cast.length !==
          0(<p>There is no information about cast of this films :(</p>)}
      <ul className="cast-list">
        {cast.length !== 0 &&
          cast.map(({ id, name, character, profile_path }) => {
            const path = `/actor/${id}/${movieId}`;
            return (
              <li key={id} className="item">
                <Link to={path} state={{ from: location }}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w300${profile_path}`
                        : PLACEHOLDER
                    }
                    className={
                      !profile_path
                        ? "cast-list__image--placeholder cast-list__image"
                        : "cast-list__image"
                    }
                    width="100px"
                    height="345px"
                    alt="an actor"
                  />
                  <p className="cast-list-name">Actor: {name}</p>
                  <p>Character: {character}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
