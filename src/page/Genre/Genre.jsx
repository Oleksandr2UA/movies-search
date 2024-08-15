import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { MoviePreview } from "../../components/MoviePreview/MoviePreview";
import { Loader } from "../../components/Loader/Loader";
import { getGenres } from "../../components/helpers/GenresData/getGenres";
import "../Genre/Genre.css";
import { fetchMovieForPages } from "../../components/helpers/GenresData/fetchMovieForPages";
import {
  ScrollToBottom,
  ScrollToHalf,
  ScrollToTop,
} from "../../components/helpers/ScrollToTop/ScrollToTop";

const Genre = () => {
  const defaultPage = 1;
  const { genreId } = useParams();
  const { movieId } = useParams(); //! STRING!!!!! ЗАВЖДИ робити конвертування у бажаний тип

  const location = useLocation(); // Ця location в state отримує собі звідки прийшов (з Movies Details прокидую "пропом" в state)
  const altPath = `/movies/${movieId}`;
  const backLinkLocationRef = useRef(location.state?.from ?? altPath); //Якщо є локація, йди туди, як ні, повернись на сторінку фільму звідки прийшов

  const altPathGenresPage = `/genres`;
  // & По факту це зайве, бо так і так назад це завжди до /genres якщо не з фільма
  // const backLinkLocationRefGenresPage = useRef(
  //   location.state?.from ?? altPathGenresPage
  // );

  // Handling state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [genreName, setGenreName] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoadMoreData, setIsLoadMoreData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function getFilmsByGenre() {
      try {
        setIsLoading(true);
        const filmsForPage1 = await fetchMovieForPages(
          genreId,
          abortController,
          defaultPage,
          1
        );
        setFilms(filmsForPage1);
        setIsLoadMore(true);
        setPage(2);

        setError(null);
      } catch (error) {
        if (error.message === "canceled") return;
        setError(
          "Something went wrong, try reloading page, if it doesnt help, there is no info about other films of this actor"
        );
      } finally {
        setIsLoading(false);
      }
    }
    getFilmsByGenre();

    return () => {
      abortController.abort();
    };
  }, [genreId]);

  useEffect(() => {
    const genreTitle = getGenres([Number(genreId)]); //! STRING!!!!!
    // [{id: 28, name: 'Action'}]
    setGenreName(genreTitle[0].name);
  }, [genreId]);

  async function onLoadMore() {
    setIsLoadMore(false);
    setIsLoadMoreData(true);
    const abortController = new AbortController();

    if (page === 2) {
      const filmsForPage2 = await fetchMovieForPages(
        genreId,
        abortController,
        page,
        2
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage2]);
    } else if (page === 3) {
      const filmsForPage3 = await fetchMovieForPages(
        genreId,
        abortController,
        page,
        3
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage3]);
    } else if (page === 4) {
      const filmsForPage4 = await fetchMovieForPages(
        genreId,
        abortController,
        page,
        4
      );
      setFilms((prevFilms) => [...prevFilms, ...filmsForPage4]);
    }

    setPage((prevPage) => prevPage + 1);

    page !== 4 ? setIsLoadMore(true) : setIsLoadMore(false); // If it is page 4 prohibid to loadmore (there arent any)
    setIsLoadMoreData(false);
  }

  return (
    <>
      {/* {backLinkLocationRef.current !== '/movies' ? (
        <Link to={backLinkLocationRef.current} className="go-back-link">
          Go back
        </Link>
      ) : (
        <Link to={altPath} className="go-back-link">
          Go back(fixed)
        </Link>
      )} */}

      <Link
        to={movieId ? backLinkLocationRef.current : altPathGenresPage}
        className="go-back-link"
      >
        Go back
      </Link>
      <h2 className="genre-list-title header-page-title">
        Films with <span className="genre-list-title-name">{genreName}</span>{" "}
        genre
      </h2>
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
      {films.length !== 0 ? (
        <MoviePreview films={films} movieId={movieId} />
      ) : (
        !isLoading && <Loader />
      )}
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

export default Genre;
