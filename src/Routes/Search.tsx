import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

function Search() {
  const history = useHistory();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IMultiSearch>(
    ["search", "movieSearch"],
    () => getMovieSearch(keyword)
  );
  const onMovieClicked = (movieTitle: string, movieId: number) => {
    history.push(`/${movieTitle}/${movieId}`);
  };
  const bigMovieMatch = useRouteMatch("/search?keyword=/:movieId");
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Result>
          {data?.results.map((item) =>
            item.backdrop_path ? (
              <>
                <Movies
                  bgImg={makeImagePath(item.backdrop_path)}
                  onClick={() => onMovieClicked(item.title, item.id)}
                />
                <Title>{item.original_title}</Title>
              </>
            ) : null
          )}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay />
                <motion.div
                  style={{
                    position: "absolute",
                    width: "40vw",
                    height: "80vh",
                    backgroundColor: "ivory",
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                ></motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </Result>
      )}
    </Wrapper>
  );
}

export default Search;
