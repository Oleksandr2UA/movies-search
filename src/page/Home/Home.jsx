import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPopularFilms } from "../../components/api/fetchFilms";
import { Loader } from "../../components/Loader/Loader";
import "../Home/Home.css";
const Home = () => {
  // Локанція куди повернутись
  const location = useLocation();

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getPopularMovies() {
      try {
        setIsLoading(true);
        const films = await fetchPopularFilms(abortController);
        setFilms(films);
        setError(null);
      } catch (error) {
        if (error.message === "canceled") return;
        setError("Something went wrong, try reloading page");
      } finally {
        setIsLoading(false);
      }
    }
    getPopularMovies();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="home__wrapper" style={{ backgroundColor: "blue" }}>
      <h1>HOME</h1>
      <h2 className="home__title">Latest films: </h2>
      {isLoading && <Loader className="loader" />}
      {error && <h2>{error}</h2>}
      <ul>
        {films.length > 0
          ? films.map(({ id, title, name }) => {
              const path = `/movies/${id}`;
              return (
                <li key={id}>
                  <Link
                    to={path}
                    state={{ from: location }}
                    className="home__link"
                  >
                    {title || name}
                  </Link>
                </li>
              );
            })
          : !isLoading && <Loader />}
      </ul>
    </div>
  );
};
export default Home;
