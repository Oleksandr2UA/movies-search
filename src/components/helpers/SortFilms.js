export function sortFilms(films) {
  const sortedFilms = [...films]
    .filter(({ vote_count }) => vote_count) // Ensure there is a vote count
    .sort((a, b) => b.vote_count - a.vote_count);
  return sortedFilms;
}
