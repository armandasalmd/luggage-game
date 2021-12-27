import { Method } from "axios";

export interface IRoute {
  path: string;
  method?: Method;
};

interface IRouteMethod {
  [key: string]: IRoute
}

interface IRouteDomain {
  [key: string]: IRouteMethod;
}

interface IRouteVariables {
  api: IRouteDomain;
  app: IRouteDomain;
}

const Variables: IRouteVariables = {
  api: {
    auth: {
      login: {
        path: "/api/users/login",
        method: "POST",
      },
      register: {
        path: "/api/users/register",
        method: "POST",
      },
      googleLogin: {
        path: "/api/google"
      },
      facebookLogin: {
        path: "/api/facebook"
      }
    },
    user: {
      coinsAndRewards: {
        path: "/api/users/coinsAndRewards",
        method: "GET"
      },
      claimReward: {
        path: "/api/users/claimReward",
        method: "POST"
      }
    },
    lobby: {
      create: {
        path: "/api/lobby",
        method: "POST"
      }
    },
    game: {
      getInitialState: {
        path: "/api/game/getState",
        method: "POST"
      },
      getActiveGameId: {
        path: "/api/game/findActive",
        method: "GET"
      }
    }
  },
  app: {
    auth: {
      login: {
        path: "/auth/login"
      },
      register: {
        path: "/auth/register"
      },
    },
    main: {
      dashboard: {
        path:  "/"
      },
      game: {
        path: "/play"
      }
    },
    legal: {
      terms: {
        path: "/terms"
      }
    }
  }
};

export default Variables;
