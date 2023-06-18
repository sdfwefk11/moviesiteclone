import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getMovieSearch } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery(
    ["search", "movieSearch"],
    getMovieSearch
  );
  console.log(data);
  console.log(keyword);
  return null;
}

export default Search;
