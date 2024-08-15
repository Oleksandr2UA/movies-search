import { fetchFilmsByGenre } from "../../api/fetchFilms";

export const fetchMovieForPages = async (
  genreId,
  abortController,
  page,
  per_page
) => {
  const movies = await fetchFilmsByGenre(genreId, abortController, page);
  // movies.length
  console.log("movies length: ", movies.length);

  if (per_page === 1) {
    const moviesForPage1 = movies.filter(
      ({ vote_count }) => vote_count >= 1000
    );
    return moviesForPage1;
  } else if (per_page === 2) {
    const moviesForPage2 = movies.filter(
      ({ vote_count }) => vote_count < 1000 && vote_count >= 200
    );
    return moviesForPage2;
  } else if (per_page === 3) {
    const moviesForPage3 = movies.filter(
      ({ vote_count }) => vote_count < 1000 && vote_count < 200
    );
    return moviesForPage3;
  }
};
