// import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import AppPublic from "./AppPublic";
import AppPrivate from "./AppPrivate";

const AuthSwitch = (props: any) => {
  // const auth = useSelector(state => state.auth);
  const auth = {
    isAuthenticated: false
  };

  return (
    <Route
      {...props}
      render={function (props: any) {
        if (auth.isAuthenticated === true) {
          return <AppPrivate {...props} />;
        } else {
          return <AppPublic {...props} />;
        }
      }}
    />
  );
};

export default AuthSwitch;
