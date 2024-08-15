import { fetchFilmReviews } from "../api/fetchFilms";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import "../Cast/Cast.css";

export const Reviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function getReviews() {
      try {
        setIsLoading(true);
        const reviews = await fetchFilmReviews(movieId, abortController);
        setError(null);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
        if (error.message === "canceled") return;
        alert("error");
        setError(`Something went wrong, if reloading page doesn't help, this films
            doesn't exist in our database`);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
    return () => {
      abortController.abort();
    };
  }, [movieId]);
  console.log("length: ", reviews.length);
  return (
    <>
      <h3>Reviews</h3>
      {isLoading && <Loader className="loader" />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && reviews.length === 0 && (
        <p>There aren't any reviews</p>
      )}
      {!isLoading && !error && reviews.length > 0 && (
        <ul className="reviews-list">
          {reviews.map(({ author, content, id }) => (
            <li key={id} className="item">
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
