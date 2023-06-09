import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getPopularMovies,
  getTopRatedMovie,
  IGetMoviesResult,
  IPopularMovie,
  ITopRatedMovie,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

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
const Banner = styled.div<{ bgImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgImg});
  background-size: cover;
`;
const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;
const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgImg: string }>`
  background-color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 120px;
  font-size: 40px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)<{ bigMovieTop: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: ${(props) => props.bigMovieTop}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  position: relative;
  padding: 10px;
  top: -43px;
`;
const BigOverview = styled.p`
  position: relative;
  top: -45px;
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
`;
const SliderBtn = styled.div`
  position: absolute;
  width: 100%;
  justify-content: space-between;
  display: flex;
  top: 50px;
  pointer-events: none;
`;
const NextBtn = styled.div`
  cursor: pointer;
  pointer-events: initial;
  justify-content: center;
  margin-top: -10px;
`;
const PrevBtn = styled.div`
  pointer-events: initial;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: -10px;
`;
const Category = styled.h2`
  text-align: center;
  background-color: ${(props) => props.theme.black.lighter};
  position: relative;
  top: -100px;
  border-radius: 4px;
  width: 12%;
  padding: 3px;
  font-size: 20px;
`;

const nowPlayingDecRowVariants = {
  hidden: {
    x: -window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: window.outerWidth - 5 },
};
const nowPlayingRowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 5 },
};
const popularDecRowVariants = {
  hidden: {
    x: -window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: window.outerWidth - 5 },
};
const popularRowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - 5 },
};
const nowPlayingBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
    y: -50,
  },
};
const popularBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
    y: -50,
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.3, type: "tween" },
  },
};

const offset = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    "/movies/nowplaying/:movieId"
  );
  const popularMatch = useRouteMatch<{ movieId: string }>(
    "/movies/popular/:movieId"
  );
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: popularMovie } = useQuery<IPopularMovie>(
    ["popular", "popularMovies"],
    getPopularMovies
  );
  const { data: topRatedMovie } = useQuery<ITopRatedMovie>(
    ["TopRated", "TopRatedMovie"],
    getTopRatedMovie
  );
  const [index, setIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState("next");
  const [popularDirec, setPopularDirec] = useState("next");
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const increasePopular = () => {
    if (popularMovie) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = popularMovie?.results.length;
      const maxMovies = Math.floor(totalMovies / offset) - 1;
      setPopularIndex((prev) => (prev === maxMovies ? 0 : prev + 1));
    }
    setPopularDirec("next");
  };
  const decreasePopular = () => {
    if (popularMovie) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = popularMovie?.results.length;
      const maxMovies = Math.floor(totalMovies / offset) - 1;
      setPopularIndex((prev) => (prev === 0 ? maxMovies : prev - 1));
    }
    setPopularDirec("prev");
  };
  console.log(popularIndex);
  const increaseIndex = () => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    setDirection("next");
  };
  const decreaseIndex = () => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
    setDirection("prev");
  };
  const nowPlayingClicked = (movieId: number) => {
    history.push(`/movies/nowplaying/${movieId}`);
  };
  const popularClicked = (movieId: number) => {
    history.push(`/movies/popular/${movieId}`);
  };
  const onOverlayClick = () => {
    history.push("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlaying?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );
  const clickPopular =
    popularMatch?.params.movieId &&
    popularMovie?.results.find(
      (movie) => movie.id + "" === popularMatch.params.movieId
    );
  return (
    <Wrapper>
      {nowPlayingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgImg={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <Category>Now Playing</Category>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={
                  direction === "next"
                    ? nowPlayingRowVariants
                    : nowPlayingDecRowVariants
                }
                transition={{ type: "tween", duration: 0.5 }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {nowPlaying?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((item) => (
                    <Box
                      onClick={() => nowPlayingClicked(item.id)}
                      variants={nowPlayingBoxVariants}
                      key={item.id}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgImg={makeImagePath(item.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{item.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <SliderBtn>
              <PrevBtn onClick={decreaseIndex}>
                <GoChevronLeft size={40} />
              </PrevBtn>
              <NextBtn onClick={increaseIndex}>
                <GoChevronRight size={40} />
              </NextBtn>
            </SliderBtn>
          </Slider>
          <Category style={{ top: "100px" }}>Popular</Category>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={popularIndex}
                transition={{ type: "tween", duration: 0.5 }}
                variants={
                  popularDirec === "next"
                    ? popularRowVariants
                    : popularDecRowVariants
                }
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  marginTop: "200px",
                }}
              >
                {popularMovie?.results
                  .slice(offset * popularIndex, offset * popularIndex + offset)
                  .map((item) => (
                    <Box
                      onClick={() => popularClicked(item.id)}
                      variants={popularBoxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={item.id}
                      bgImg={makeImagePath(item.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{item.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <SliderBtn style={{ marginTop: "200px" }}>
              <PrevBtn onClick={decreasePopular}>
                <GoChevronLeft size={40} />
              </PrevBtn>
              <NextBtn onClick={increasePopular}>
                <GoChevronRight size={40} />
              </NextBtn>
            </SliderBtn>
          </Slider>
          <Category style={{ top: "300px" }}>Top Rated</Category>
          <Slider>
            <Row style={{ marginTop: "400px" }}>
              {topRatedMovie?.results
                .slice(offset * topRatedIndex, offset * topRatedIndex + offset)
                .map((item) => (
                  <Box bgImg={makeImagePath(item.backdrop_path, "w500")} />
                ))}
            </Row>
          </Slider>
          {bigMovieMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <BigMovie
                layoutId={bigMovieMatch.params.movieId}
                bigMovieTop={scrollY.get() + 110}
              >
                {clickedMovie && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                          clickedMovie.backdrop_path
                        )})`,
                      }}
                    />
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                  </>
                )}
              </BigMovie>
            </>
          ) : null}
          {popularMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <BigMovie
                layoutId={popularMatch.params.movieId}
                bigMovieTop={scrollY.get() + 110}
              >
                {clickPopular && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                          clickPopular.backdrop_path
                        )})`,
                      }}
                    />
                    <BigTitle>{clickPopular.title}</BigTitle>
                    <BigOverview>{clickPopular.overview}</BigOverview>
                  </>
                )}
              </BigMovie>
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default Home;
