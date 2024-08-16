import { fetchFilmsByGenre, fetchSimilarMovies } from "../../api/fetchFilms";

export const fetchMovieForPages = async (
  genreId,
  abortController,
  page,
  per_page,
  movieId
) => {
  const movies = [];
  if (genreId !== null) {
    movies.push(...(await fetchFilmsByGenre(genreId, abortController, page)));
    // console.log("genreId is ", genreId);
  } else if (genreId === null) {
    // console.log("movie id is ", movieId);
    movies.push(...(await fetchSimilarMovies(movieId, abortController)));
  }
  // console.log("movies length: ", movies);

  if (per_page === 1) {
    const moviesForPage1 = movies.filter(
      ({ vote_count }) => vote_count >= 1500
    );
    return moviesForPage1;
  } else if (per_page === 2) {
    const moviesForPage2 = movies.filter(
      ({ vote_count }) => vote_count < 1500 && vote_count >= 800
    );
    return moviesForPage2;
  } else if (per_page === 3) {
    const moviesForPage3 = movies.filter(
      ({ vote_count }) => vote_count < 800 && vote_count >= 500
    );
    return moviesForPage3;
  } else if (per_page === 4) {
    const moviesForPage4 = movies.filter(
      ({ vote_count }) => vote_count < 500 && vote_count > 50
    );
    return moviesForPage4;
  }
};
