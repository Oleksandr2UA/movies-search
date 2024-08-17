import { MoviePreview } from "../../components/MoviePreview/MoviePreview";

export const SelectedFilms = ({ selectedFilms, id }) => {
  console.log(
    "SelectedFilms component received selectedFilms: ",
    selectedFilms
  );

  return (
    <>
      <h2>Selected Films</h2>
      {selectedFilms.length > 0 ? (
        <MoviePreview films={selectedFilms} movieId={id} />
      ) : (
        <p>No films selected.</p>
      )}
    </>
  );
};
