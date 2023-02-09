const jwt = require("jsonwebtoken");
const HttpException = require("../exceptions/httpExceptions");
const DB = require("../database");

const authMiddleware = async (req, res, next) => {
  const headers = req.headers;
  const isBearer = headers.authorization && headers.authorization.split(" ")[0] === "Bearer";

  try {
    if (headers && isBearer) {
      const token = headers.authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET;
      const verificationResponse = jwt.verify(token, secret);
      const userId = verificationResponse.id;
      const findUserById = await DB.Users.findByPk(userId).catch(err=> console.error(err));

      if (findUserById) {
        req.authTokenData = { id: userId, name: findUserById.name, role: findUserById.role };
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(401, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

module.exports = authMiddleware;
