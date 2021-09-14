import { ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchMe } from "./api/fetchAccount";
import { AuthRoute, PrivateRoute } from "./HOC/Route/route";
import theme from "./theme/theme";
import Detail from "./view/Detail/Detail";
import Home from "./view/Home/Home";
import Profile from "./view/Profile/Profile";
import Signin from "./view/Signin/Signin";
import Signup from "./view/Signup/Signup";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accountToken = localStorage.getItem("accountToken");
    if (accountToken) {
      dispatch(fetchMe(accountToken));
    }
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <PrivateRoute path="/detail/:id" exact component={Detail} />
            <AuthRoute
              path="/signin"
              exact
              component={Signin}
              redirectPath="/"
            />
            <AuthRoute
              path="/signup"
              exact
              component={Signup}
              redirectPath="/"
            />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute
              path="/"
              exact
              component={Home}
              redirectPath="/signin"
            />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
