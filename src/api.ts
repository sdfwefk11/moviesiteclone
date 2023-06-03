const API_KEY = "1b86acec5851a012fe6a11323ab396f0";
const BASE_PATH = "https://api.themoviedb.org/3/";

export function getMovies() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
