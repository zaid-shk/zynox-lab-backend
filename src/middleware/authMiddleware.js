const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt");
const JWT_TOKEN = jwtConfig.secret;
function authMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        message: "You are not signed in",
      });
    }
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
module.exports = { authMiddleware };
