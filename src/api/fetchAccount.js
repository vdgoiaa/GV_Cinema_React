import axios from "axios";
import createAction from "../store/actions/actions";
import actionType from "../store/actions/type";

export const handleSignin = (values, props) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
      data: values,
    })
      .then((res) => {
        console.log(res.data);
        alert("Signin Success");
        if (dispatch(createAction(actionType.SET_ME, res.data))) {
          localStorage.setItem("accountToken", res.data.content.accessToken);
          props.history?.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Signin Error");
      });
  };
};

export const handleSignup = (values) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
      data: values,
    })
      .then((res) => {
        console.log(res.data);
        alert("Signup Success");
      })
      .catch((err) => {
        console.log(err);
        alert("Signup Error");
      });
  };
};

export const fetchMe = (accountToken) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      headers: {
        Authorization: "Bearer " + accountToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.SET_ME, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
