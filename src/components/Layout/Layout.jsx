import { Loader } from "../Loader/Loader";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/genres">Genres</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <p>
          Data base of themoviedb.org is being used in project, all information
          is taken from there
        </p>
      </footer>
    </>
  );
};
