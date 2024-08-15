import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { fetchFilmsByName } from "../../components/api/fetchFilms";
import "../Movies/Movies.css";

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [films, setFilms] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(
      "when component mounts, if to ignore mount, on mount title is null"
    );
    //When component mounts I check if
    // - there is title -> I came back from one film -> Put film's name in input, and make fetch
    // - there is NO title (null) -> I haven't searched any film
    const title = searchParams.get("query");
    if (title) {
      setQuery(title);
      fetchFilms(title);
    }
  }, [searchParams]);

  const fetchFilms = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const films = await fetchFilmsByName(query);
      setFilms(films);
    } catch (err) {
      setError("Failed to fetch films");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('query on submit');
    const params = query !== "" ? { query } : {};
    setSearchParams(params); // Update URL with input
  };

  const onInputChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div className="movies__wrapper">
      <h1>Movies</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter film's name"
          name="title"
          value={query}
          onChange={onInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <ul className="movies-list">
        {films &&
          !isLoading &&
          films.map(({ title, id }) => {
            const path = `/movies/${id}`;
            return (
              <li key={id}>
                <Link to={path} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Movies;
