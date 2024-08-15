import axios from "axios";
const KEY = "3d1b22cd317768d7fb4a69e9683da357";
const BASE_URL = "https://api.themoviedb.org/3";

axios.defaults.baseURL = BASE_URL;
const params = {
  params: {
    api_key: KEY,
    language: "en-US",
  },
};
export const fetchPopularFilms = async (abortController) => {
  const resp = await axios.get(`/trending/all/day`, {
    ...params,
    signal: abortController.signal,
  });
  return resp.data.results;
};
export const fetchFilmsByName = async (title) => {
  const response = await axios.get(`/search/movie?query=${title}`, params);
  return response.data.results;
};
export const fetchFilmDetails = async (id, abortController) => {
  const videosResp = await axios.get(`/movie/${id}/videos`, params);

  const trailers = await videosResp.data.results.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const video = `https://www.youtube.com/embed/${trailers[0].key}`;
  // console.log('video ', video);
  const resp = await axios.get(`/movie/${id}`, {
    ...params,
    signal: abortController.signal,
  });
  const movieData = resp.data;

  return { movieData, video };
};
export const fetchFilmCredits = async (id, abortController) => {
  const resp = await axios.get(`movie/${id}/credits`, {
    ...params,
    signal: abortController.signal,
  });
  return resp.data.cast;
};
export const fetchFilmReviews = async (id, abortController) => {
  const resp = await axios.get(`movie/${id}/reviews`, {
    ...params,
    signal: abortController.signal,
  });
  return resp.data.results;
};

export const fetchActorDetails = async (id, abortController) => {
  const actorDetailsResp = await axios.get(`/person/${id}`, {
    ...params,
    signal: abortController.signal,
  });
  const actorName = actorDetailsResp.data.name;

  const resp = await axios.get(`/person/${id}/movie_credits`, {
    ...params,
    signal: abortController.signal,
  });

  const cast = resp.data.cast;

  return {
    cast,
    actorName,
  };
};

export const fetchFilmsByGenre = async (id, abortController, page) => {
  // Have to make 3 request because api doesnt allow parametr per_page (it gives def amout and that is it)
  // Is diferent pages for api contain films with diferent amounts of views, i cant make normal pagination
  // Bcs i dont want to show 2 films with 2000 views and then with 1 view, it is stupid
  // That is why i have to make 3 requests to have 60 films to work with i then filter them and show from the most viewed to the least viewed, by loadMore button
  const resp = await axios.get(
    `discover/movie?page=${page}&with_genres=${id}`,
    {
      ...params,
      signal: abortController.signal,
    }
  );
  const resp2 = await axios.get(
    `discover/movie?page=${page + 1}&with_genres=${id}`,
    {
      ...params,
      signal: abortController.signal,
    }
  );
  const resp3 = await axios.get(
    `discover/movie?page=${page + 2}&with_genres=${id}`,
    {
      ...params,
      signal: abortController.signal,
    }
  );
  // const films = resp.data.results;
  const films = [
    ...resp.data.results,
    ...resp2.data.results,
    ...resp3.data.results,
  ];
  return films;
};
export const fetchSimilarMovies = async (movieId, abortController) => {
  const requests = [1, 2, 3, 4, 5].map((page) =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?page=${page}`,
      {
        ...params,
        signal: abortController.signal,
      }
    )
  );
  const responses = await Promise.all(requests);
  const allMovies = responses.flatMap((resp) => resp.data.results);
  console.log("all movies: ", allMovies);
  return allMovies;
};
