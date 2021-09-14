import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React, { Fragment} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../../api/movieList";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import useLoading from "../../components/Loading/useLoading";
import "./detail.css";

const Detail = (props) => {
  const { loading } = useLoading();

  const dispatch = useDispatch();

  const movieDetail = useSelector((state) => {
    return state.movies.movieDetails;
  });

  useEffect(() => {
    const movieId = props.match.params.id;
    // console.log(movieId);
    dispatch(getMovieDetails(movieId));
  }, [dispatch, props.match.params.id]);

  return (
    <div style={{ backgroundColor: "#bcbcbc" }}>
      <Header />
      {loading === true ? (
        <Loading />
      ) : (
        <Fragment>
          <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h2" align="center">
              Details
            </Typography>
            <Card style={{ backgroundColor: "#eeeeee" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Movie Details"
                  height="500"
                  image={movieDetail.hinhAnh}
                  title="Movie Details"
                  className="card_img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {movieDetail.tenPhim}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                  >
                    {movieDetail.moTa}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    Trailer
                  </Typography>
                  <iframe
                    width="100%"
                    height="500px"
                    src={movieDetail.trailer}
                    title="Trailer"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="medium" color="primary" variant="contained">
                  Add to playlist
                </Button>
                <Button size="medium" color="secondary" variant="contained">
                  Watch Now
                </Button>
              </CardActions>
            </Card>
          </Container>
        </Fragment>
      )}
    </div>
  );
};

export default Detail;
