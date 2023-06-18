const API_KEY = "1b86acec5851a012fe6a11323ab396f0";
const BASE_PATH = "https://api.themoviedb.org/3/";

interface IGenre_ids {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
}
interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: IGenre_ids[] | undefined;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

export function getMovieSearch() {
  return fetch(
    `${BASE_PATH}search/multi?api_key=${API_KEY}&query=fast%20x&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
}
