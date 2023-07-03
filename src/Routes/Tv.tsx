import { useQuery } from "@tanstack/react-query";
import { getVideosSearch } from "../api";

function Tv() {
  const { data, isLoading } = useQuery(
    ["videos", "searchVideos"],
    getVideosSearch
  );
  console.log(data);
  return null;
}

export default Tv;
