export function sortFilms(films) {
  const uniqueFilms = [];
  // Sometimes api can give two the same films
  const seenIds = new Set();
  for (const film of films) {
    if (!seenIds.has(film.id)) {
      seenIds.add(film.id); // не можу поставити перед if, бо тоді завжди seenIds має всі id
      uniqueFilms.push(film);
    }
  }

  const sortedFilms = uniqueFilms
    .filter(({ vote_count }) => vote_count) // Ensure there is a vote count
    .sort((a, b) => b.vote_count - a.vote_count);
  return sortedFilms;
}
