import { fetchActorDetails } from "../../components/api/fetchFilms";
import { MoviePreview } from "../../components/helpers/MoviePreview/MoviePreview";
import {
  ScrollToBottom,
  ScrollToHalf,
  ScrollToTop,
} from "../../components/helpers/ScrollToTop/ScrollToTop";
import { useRef } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../ActorDetails/ActorDetails.css";

export const ActorDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { actorId } = useParams();
  const { movieId } = useParams(); //! STRING!!!!! ЗАВЖДИ робити конвертування у бажаний тип
  const location = useLocation(); // Ця location в state отримує собі звідки прийшов (з Movies прокидую пропом)
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");

  const [films, setFilms] = useState([]);
  const [actor, setActor] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    async function getActorDetails() {
      try {
        setIsLoading(true);
        const { cast, actorName } = await fetchActorDetails(
          actorId,
          abortController
        );
        setFilms(cast);
        setActor(actorName);
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
    getActorDetails();

    return () => {
      abortController.abort();
    };
  }, [actorId]);

  const altPath = `/movies/${movieId}/cast`;
  //onClick={() => navigate('/movies/268/cast')}
  return (
    <>
      {backLinkLocationRef.current !== "/movies" ? (
        <Link to={backLinkLocationRef.current} className="go-back-link">
          Go back
        </Link>
      ) : (
        <Link to={altPath}>Go back</Link> //fixed
      )}
      <h2 className="actor-details-title-name header-page-title">
        More films with {actor ? <span>{actor}</span> : <span>🙋‍♀️/🙋‍♂️</span>}
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
        <MoviePreview films={films} character={"character"} />
      ) : (
        !isLoading && <Loader />
      )}
      {films.length !== 0 && (
        <div className="scroll_wrapper">
          <ScrollToTop />
          <ScrollToHalf />
        </div>
      )}
    </>
  );
};
