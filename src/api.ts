const API_KEY = "1b86acec5851a012fe6a11323ab396f0";
const BASE_PATH = "https://api.themoviedb.org/3/";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
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
interface ISearchResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type: string;
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
export interface IMultiSearch {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}
interface IpopularResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}
export interface IPopularMovie {
  page: number;
  results: IpopularResult[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
}
export function getMovieSearch(keyword: any) {
  return fetch(
    `${BASE_PATH}search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=ko-KR&page=1`
  ).then((response) => response.json());
}
export function getVideosSearch() {
  return fetch(
    `${BASE_PATH}movie/667538/videos?api_key=${API_KEY}&language=ko-KR'`
  ).then((response) => response.json());
}
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
}
