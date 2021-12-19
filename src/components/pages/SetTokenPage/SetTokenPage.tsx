import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import RouteUtils from "@utils/Route";
import { setToken } from "@redux/actions";

const SetTokenPage = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
    // eslint-disable-next-line
  }, []);

  const redirectLink = !!token
    ? RouteUtils.routes.app.main.dashboard.path
    : RouteUtils.routes.app.auth.login.path;

  return <Redirect to={redirectLink} />;
};

export default SetTokenPage;