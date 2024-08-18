import { MoviePreview } from "../../components/MoviePreview/MoviePreview";
import "../SelectedFilms/SelectedFilms.css";

export const SelectedFilms = ({ selectedFilms, id }) => {
  console.log(
    "SelectedFilms component received selectedFilms: ",
    selectedFilms
  );

  return (
    <>
      <h1>Selected Films</h1>
      {selectedFilms.length > 0 ? (
        <MoviePreview
          films={selectedFilms}
          movieId={id}
          isSelectedPage={true}
        />
      ) : (
        <div className="no-films-message">
          <h2 className="no-films-message-title">No films selected :-)</h2>
          <span>🎥</span>
        </div>
      )}
    </>
  );
};
