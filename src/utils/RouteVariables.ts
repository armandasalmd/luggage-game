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
      },
      inviteFriend: {
        path: "/api/lobby/inviteFriend",
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
    },
    friends: {
      search: {
        path: "/api/friends/search",
        method: "POST"
      },
      add: {
        path: "/api/friends/add",
        method: "POST"
      },
      friendsAndInvites: {
        path: "/api/friends/friendsAndInvites",
        method: "GET"
      },
      remove: {
        path: "/api/friends",
        method: "DELETE"
      },
      respondInvite: {
        path: "/api/friends/respondInvite",
        method: "POST"
      },
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
