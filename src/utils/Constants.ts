const constants = {
  authTokenType: "Bearer",
  defaultAvatar: "/images/avatar.png",
  env: process.env.NODE_ENV,
  servers: {
    devApi: "http://localhost:3001",
    prodApi: "https://luggage-api.herokuapp.com"
  },
  preferDevApi: true,
  cardRotation: {
    from: -6,
    to: 6
  }
};

export default constants;