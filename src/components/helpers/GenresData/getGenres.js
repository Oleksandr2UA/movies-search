import { genres as baseOfGenres } from '../GenresData/genresData.js';

export function getGenres(genres) {
  //   console.log('baseOfGenres ', baseOfGenres);
  // console.log('genres', genres);

  const genresArr = [];
  for (let i = 0; i < genres.length; i++) {
    const genredId = genres[i];

    const genreObj = baseOfGenres.find(({ id }) => id === genredId);
    genresArr.push(genreObj);
  }
  return genresArr;
}
