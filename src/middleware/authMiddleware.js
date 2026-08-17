const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;
function authMiddleware(req, res, next) {
  // verify token
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_TOKEN);
  // attach user
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
}

module.exports = { authMiddleware };
