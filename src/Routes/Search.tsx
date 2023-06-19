import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getMovieSearch } from "../api";

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
interface IMultiSearch {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  getMovieSearch(keyword);
  // const { data, isLoading } = useQuery<IMultiSearch>(
  //   ["search", "movieSearch"],
  //   getMovieSearch
  // );
  return null;
}

export default Search;
