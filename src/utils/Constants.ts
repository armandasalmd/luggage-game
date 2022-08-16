const constants = {
  authTokenType: "Bearer",
  defaultAvatar: "/images/avatar.png",
  defaultAvatarSize: 156,
  defaultErrorMessage: "Unexpected error",
  env: process.env.NODE_ENV,
  gameModeTitles: {
    "classic": "Classic game mode"
  },
  messageDuration: 5000,
  servers: {
    devApi: "http://localhost:3001",
    prodApi: "https://luggage-api.herokuapp.com",
    assets: "https://luggage-cards.s3.eu-central-1.amazonaws.com"
  },
  preferDevApi: false,
};

export default constants;