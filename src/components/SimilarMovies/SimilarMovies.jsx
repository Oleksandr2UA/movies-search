import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieForPages } from "../helpers/GenresData/fetchMovieForPages";
import {
  ScrollToBottom,
  ScrollToHalf,
  ScrollToTop,
} from "../helpers/ScrollToTop/ScrollToTop";
import "../SimilarMovies/SimilarMovies.css";
import { Loader } from "../Loader/Loader";
import { MoviePreview } from "../MoviePreview/MoviePreview";

export const SimilarMovies = () => {
  const defaultPage = 1;
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoadMoreData, setIsLoadMoreData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function getSimilarFilms() {
      try {
        setIsLoading(true);
        // const movies = await fetchSimilarMovies(movieId, abortController);
        const filmsForPage1 = await fetchMovieForPages(
          null,
          abortController,
          defaultPage,
          1,
          movieId
        );
        setFilms(filmsForPage1);
        setError(null);
        setIsLoadMore(true);
        setPage(2);
      } catch (error) {
        if (error.message === "canceled") return;
        setError(`Something went wrong, if reloading page doesn't help, this films
            doesn't exist in our database`);
      } finally {
        setIsLoading(false);
      }
    }
    getSimilarFilms();

    return () => {
      abortController.abort();
    };
  }, [movieId]);

  async function onLoadMore() {
    setIsLoadMore(false);
    setIsLoadMoreData(true);
    const abortController = new AbortController();

    if (page === 2) {
      const filmsForPage2 = await fetchMovieForPages(
        null,
        abortController,
        page,
        2,
        movieId
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage2]);
    } else if (page === 3) {
      const filmsForPage3 = await fetchMovieForPages(
        null,
        abortController,
        page,
        3,
        movieId
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage3]);
    } else if (page === 4) {
      const filmsForPage4 = await fetchMovieForPages(
        null,
        abortController,
        page,
        4,
        movieId
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage4]);
    }

    setPage((prevPage) => prevPage + 1);

    page !== 4 ? setIsLoadMore(true) : setIsLoadMore(false); // If it is page 4 prohibid to loadmore (there arent any)
    setIsLoadMoreData(false);
  }
  return (
    <>
      <h3>Similar movies</h3>
      {films.length !== 0 && (
        <div className="scroll_wrapper">
          <ScrollToBottom />
          <ScrollToHalf />
        </div>
      )}
      {error && (
        <>
          <h2 className="error">{error}</h2>
        </>
      )}
      {isLoading && <Loader />}
      {!isLoading && films.length === 0 && <Loader />}
      {error &&
        !isLoading &&
        films.length !==
          0(<p>There is no information about cast of this films :(</p>)}

      <ul>
        {films.length !== 0 && (
          <li>
            <MoviePreview films={films} />
          </li>
        )}
      </ul>
      {isLoadMore && !isLoading ? (
        <button type="button" className="genre-btn-load" onClick={onLoadMore}>
          Load more
        </button>
      ) : isLoadMoreData && !isLoading && films.length !== 0 ? (
        <>
          <Loader />
        </>
      ) : null}
      {films.length !== 0 && (
        <div className="scroll_wrapper">
          <ScrollToTop />
          <ScrollToHalf />
        </div>
      )}
    </>
  );
};
