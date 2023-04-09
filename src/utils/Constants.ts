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
    prodApi: "https://luggage-game-api.onrender.com",
    assets: "https://luggage-cards.s3.eu-central-1.amazonaws.com"
  },
  preferDevApi: true,
};

export default constants;
