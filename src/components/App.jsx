// import { Home } from 'page/Home/Home';
// import { MovieDetails } from 'page/MovieDetails/MovieDetails';
// import { Movies } from 'page/Movies/Movies';
import { Route, Routes } from "react-router-dom";
import { Cast } from "./Cast/Cast";
import { Reviews } from "./Reviews/Reviews";
import { Layout } from "./Layout/Layout";
// import { WrongPage } from '../page/WrongPage/WrongPage';
import { lazy, useEffect, useState } from "react";
import { ActorDetails } from "../page/ActorDetails/ActorDetails";
import { SimilarMovies } from "./SimilarMovies/SimilarMovies";
import { SelectedFilms } from "../page/SelectedFilms/SelectedFilms";
import { fetchFilmDetails } from "./api/fetchFilms";
// import Genre from 'page/Genre/Genre';

const Home = lazy(() => import("../page/Home/Home"));
const WrongPage = lazy(() => import("../page/WrongPage/WrongPage"));
const Movies = lazy(() => import("../page/Movies/Movies"));
const MovieDetails = lazy(() => import("../page/MovieDetails/MovieDetails"));
const Genre = lazy(() => import("../page/Genre/Genre"));
const GenreSelection = lazy(() =>
  import("../page/GenreSelection/GenreSelection")
);
const LOCAL_ST_KEY = "saved-films";
const readLocal_ST = () => {
  const data = localStorage.getItem(LOCAL_ST_KEY);
  if (data) return JSON.parse(data);
  return [];
};
export const App = () => {
  const [selectedFilms, setSelectedFilms] = useState(readLocal_ST);
  const [movieId, setMovieId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  function setSelectedId(id) {
    const abortController = new AbortController();

    async function getSelectedFilm(id) {
      const { movieData } = await fetchFilmDetails(id, abortController);
      console.log("movie data: ", movieData);
      setSelectedFilms((prevFilms) => [...prevFilms, movieData]);
      setMovieId(id);
    }

    getSelectedFilm(id);
  }
  // Просто ефект, замість того щоб записувати в getSelectedFilm, бо setState це асинхрон, тому ТІЛЬКИ В ЕФЕКТІ
  useEffect(() => {
    localStorage.setItem(LOCAL_ST_KEY, JSON.stringify(selectedFilms));
  }, [selectedFilms]);

  useEffect(() => {
    console.log("have to delete: ", Number(deleteId));
    console.log("selectedFilms: ", selectedFilms);
    const filteredFilms = selectedFilms.filter(
      ({ id }) => id !== Number(deleteId)
    );
    setSelectedFilms([...filteredFilms]);

    // console.log("filtrederFilms ", filteredFilms);
    return () => {};
  }, [deleteId]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/genres" element={<GenreSelection />} />
          <Route
            path="/selected"
            element={
              <SelectedFilms
                key={selectedFilms.length}
                selectedFilms={selectedFilms}
                id={movieId}
              />
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetails
                onSetSelected={setSelectedId}
                onDeleteId={setDeleteId}
                selectedFilms={selectedFilms}
              />
            }
          >
            {/*Обнорнув вкладені маршрути, тому ставлю outlet, місце куди рендерити компоненти } */}
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="similar" element={<SimilarMovies />} />
          </Route>
          <Route path="/movies/:movieId/:genreId" element={<Genre />} />
          <Route path="/genres/:genreId" element={<Genre />} />
          <Route path="/actor/:actorId/:movieId" element={<ActorDetails />} />
          <Route path="*" element={<WrongPage />} />
        </Route>
      </Routes>
    </>
  );
};
