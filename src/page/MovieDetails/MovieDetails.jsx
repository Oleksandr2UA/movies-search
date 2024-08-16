import { useRef, useEffect, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { fetchFilmDetails } from "../../components/api/fetchFilms";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";
import "../MovieDetails/MovieDetails.css";
import "../Home/Home.css";

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { movieId } = useParams();
  //* Location
  const location = useLocation(); // Ця location в state отримує собі звідки прийшов (з Movies прокидую пропом)
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies"); // В реф зберігаю, тепер навіть коли сторінка оновлюється/re-render через cast, reviews в .current буде правильна локація
  // А якщо прийшов з нової вкладки, перейде на /movies
  //* Location end

  function onCloseModal() {
    setIsOpenModal(false);
  }

  function onOpenModal() {
    setIsOpenModal(true);
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function getDetails() {
      try {
        setIsLoading(true);
        const { movieData, video } = await fetchFilmDetails(
          movieId,
          abortController
        );
        setInfo(movieData);
        setTrailer(video);
        setError(null);
      } catch (error) {
        if (error.message === "canceled") return;
        setError(
          "Something went wrong, try reloading page, if it doesnt help, there is no info about this film"
        );
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
    return () => {
      abortController.abort();
    };
  }, [movieId]);

  return (
    <>
      <Link to={backLinkLocationRef.current} className="go-back-link">
        Go back
      </Link>
      {error && Object.keys(info).length === 0 && (
        <>
          <h2 className="error">{error}</h2>
        </>
      )}
      {isLoading && <Loader />}
      {Object.keys(info).length !== 0 && (
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
            width="200px"
            height="300px"
            alt="poster"
          />
          <div className="movie-info">
            <h1>{info.title}</h1>
            <p className="movie-stars">
              {info.vote_average.toFixed(1) >= 7 ? (
                <FaStar key={info.id} className="star" />
              ) : info.vote_average.toFixed(1) >= 5 ? (
                <FaStarHalfAlt key={info.id} className="star" />
              ) : (
                <FaRegStar key={info.id} className="empty-star" />
              )}
              {info.vote_average.toFixed(1) + "/10"}
            </p>
            <h3 className="movie-subtitle">Overview: </h3>
            <p>{info.overview}</p>
            <button onClick={onOpenModal}>Watch trailer</button>
            <h4 className="movie-genres">Genres:</h4>
            {info.genres.map(({ id, name }) => {
              const path = `/movies/${movieId}/${id}`;
              return (
                <Link to={path} key={id} state={{ from: location }}>
                  <span>{name} </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {!isLoading && Object.keys(info).length === 0 && <Loader />}
      {trailer && isOpenModal && (
        <Modal closeModal={onCloseModal} src={trailer} />
      )}
      {Object.keys(info).length !== 0 && (
        <>
          <p>
            <Link to="cast" className="sidebar-link">
              Cast
            </Link>
          </p>
          <p>
            <Link to="reviews" className="sidebar-link">
              Reviews
            </Link>
          </p>
          <p>
            <Link to="similar" className="sidebar-link">
              Show similar movies
            </Link>
          </p>
          <Suspense>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};
export default MovieDetails;
