import { Grid } from "@material-ui/core";
import { Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { MovieItems } from "../../components/MovieItems/MovieItems";
import Pagination from "../../components/Pagination/Pagination";
import queryString from "query-string";
import useLoading from "../../components/Loading/useLoading";
import Loading from "../../components/Loading/Loading";
import { fetchMovieList } from "../../api/movieList";

const Home = () => {
  // console.log(props);

  const { loading } = useLoading();

  // set phân trang
  const [filters, setFilters] = useState({
    soTrang: 1,
    soPhanTuTrenTrang: 12,
  });

  const paramsString = queryString.stringify(filters);

  const dispatch = useDispatch();

  const movieList = useSelector((state) => {
    return state.movies.movieList.content;
  });

  useEffect(() => {
    dispatch(fetchMovieList(paramsString));
  }, [dispatch, paramsString]);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      soTrang: newPage,
    });
  };

  return (
    <div style={{ backgroundColor: "#bcbcbc" }}>
      <Header />
      {loading === true ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 50 }}>
          <Typography component="h2" variant="h3" gutterBottom align="center">
            Movie List
          </Typography>
          <Grid container spacing={3} style={{ paddingBottom: 50 }}>
            {movieList?.items.map((item) => {
              return (
                <Grid xs={12} sm={6} md={3} item>
                  <MovieItems key={item.maPhim} movies={item} />
                </Grid>
              );
            })}
          </Grid>
          <Pagination pagination={movieList} onPageChange={handlePageChange} />
        </Container>
      )}
    </div>
  );
};

export default Home;
