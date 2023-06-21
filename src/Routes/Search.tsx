import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, IMultiSearch } from "../api";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Result = styled.div``;
const Movies = styled.div``;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IMultiSearch>(
    ["search", "movieSearch"],
    () => getMovieSearch(keyword)
  );
  console.log(keyword);
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Result>
          {data?.results.map((item) => (
            <Movies>{item.original_title}</Movies>
          ))}
        </Result>
      )}
    </Wrapper>
  );
}

export default Search;
