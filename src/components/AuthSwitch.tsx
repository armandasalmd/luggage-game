import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import type { RootState } from "@redux/store";

import AppPublic from "./AppPublic";
import AppPrivate from "./AppPrivate";

const AuthSwitch = (props: any) => {
  const userState = useSelector((state: RootState) => state.user);

  return (
    <Route
      {...props}
      render={function (props: any) {
        if (userState?.isAuthenticated === true) {
          return <AppPrivate {...props} />;
        } else {
          return <AppPublic {...props} />;
        }
      }}
    />
  );
};

export default AuthSwitch;
