import jwt from "jsonwebtoken";
import validator from "validator";

const jwtValidation = (req, res, next) => {
  const token = req.hearders.authorization.split("")[1];
  if (!token || validator.isEmpty(token)) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded.id || !validator.isMongoId(decoded.id)) {
    return res.status(401).json({
      message: "INvalid token",
    });
  }

  req.body.userId = decoded.id;
  req.body.username = decoded.username;

  next();
};

export default jwtValidation;
