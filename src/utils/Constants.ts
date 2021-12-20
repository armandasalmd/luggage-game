const constants = {
  authTokenType: "Bearer",
  defaultAvatar: "/images/avatar.png",
  env: process.env.NODE_ENV,
  servers: {
    devApi: "http://localhost:3001",
    prodApi: "https://luggage-api.herokuapp.com",
    assets: "https://luggage-cards.s3.eu-central-1.amazonaws.com"
  },
  preferDevApi: false,
  cardRotation: {
    from: -6,
    to: 6
  }
};

export default constants;