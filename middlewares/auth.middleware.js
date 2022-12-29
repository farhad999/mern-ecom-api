const tokenService = require("../services/tokenService");

const auth = (req, res, next) => {
  if (
    !req.headers.hasOwnProperty("authorization")
  ) {
    return res.status(403).json({ status: "failed", message: "Unauthorized" });
  }

  if(req.headers['authorization']<=8){
    return res.status(403).json({ status: "failed", message: "Unauthorized" });
  }

  const token = req.headers["authorization"].split(" ")[1];

  const {value, error} = tokenService.verifyToken(token);

  if(error){
    return res.status(403).json({message: "Unathorized"});
  }

  req.user = value;

  return next();
};

module.exports = auth;
