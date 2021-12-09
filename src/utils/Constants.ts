const constants = {
  authTokenType: "Bearer",
  defaultAvatar: "/images/avatar.png",
  env: process.env.NODE_ENV,
  servers: {
    devApi: "http://localhost:3001",
    prodApi: "https://luggage-api.herokuapp.com"
  },
  preferDevApi: false
};

export default constants;