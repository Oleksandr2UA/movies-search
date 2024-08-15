// import { Home } from 'page/Home/Home';
// import { MovieDetails } from 'page/MovieDetails/MovieDetails';
// import { Movies } from 'page/Movies/Movies';
import { Route, Routes } from "react-router-dom";
import { Cast } from "./Cast/Cast";
import { Reviews } from "./Reviews/Reviews";
import { Layout } from "./Layout/Layout";
// import { WrongPage } from '../page/WrongPage/WrongPage';
import { lazy } from "react";
import { ActorDetails } from "../page/ActorDetails/ActorDetails";
// import Genre from 'page/Genre/Genre';

const Home = lazy(() => import("../page/Home/Home"));
const WrongPage = lazy(() => import("../page/WrongPage/WrongPage"));
const Movies = lazy(() => import("../page/Movies/Movies"));
const MovieDetails = lazy(() => import("../page/MovieDetails/MovieDetails"));
const GenreSelection = lazy(() =>
  import("../page/GenreSelection/GenreSelection")
);
const Genre = lazy(() => import("../page/Genre/Genre"));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/genres" element={<GenreSelection />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            {/*Обнорнув вкладені маршрути, тому ставлю outlet, місце куди рендерити компоненти } */}
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
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
