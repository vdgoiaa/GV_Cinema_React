import axios from "axios";
import createAction from "../store/actions/actions";
import actionType from "../store/actions/type";

export const fetchMovieList = (paramsString) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&${paramsString}`,
    })
      .then((res) => {
        console.log(res);
        dispatch(createAction(actionType.GET_MOVIE_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getMovieDetails = (movieId) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?",
      params: {
        MaPhim: movieId,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(createAction(actionType.GET_MOVIE_DETAILS, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
