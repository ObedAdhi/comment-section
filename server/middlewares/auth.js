const { verifyToken } = require("../helper/jwt");
const User = require("../models/user");

async function authentication (req, res, next) {
  try {
    const decodeToken = verifyToken(req.headers.access_token)
    const email = decodeToken.email
    console.log(email);

    const user = await User.findByEmail(email)
    if (!user) {
      return next ({name: "WRONG_LOGIN"})
    }
    req.user = user
    return next()

  } catch (error) {
    console.log(error);
    next({name: "NOT_LOGGED_IN"})
  }
}

module.exports = {
  authentication
}