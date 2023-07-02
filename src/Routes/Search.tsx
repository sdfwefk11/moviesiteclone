import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, IMultiSearch } from "../api";
import { makeImagePath } from "../utils";

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
const Result = styled.div`
  position: absolute;
  width: 90vw;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: black;
`;
const Movies = styled.div<{ bgImg: string }>`
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 600px;
`;
const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  top: -80px;
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
  background-color: ${(props) => props.theme.black.lighter};
  font-size: 50px;
`;

function Search() {
  const location = useLocation();
  console.log(location.search);
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data, isLoading } = useQuery<IMultiSearch>(
    ["search", "movieSearch"],
    () => getMovieSearch(keyword)
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Result>
          {data?.results.map((item) =>
            item.backdrop_path ? (
              <>
                <Movies bgImg={makeImagePath(item.backdrop_path)} />
                <Title>{item.original_title}</Title>
              </>
            ) : null
          )}
        </Result>
      )}
    </Wrapper>
  );
}

export default Search;
