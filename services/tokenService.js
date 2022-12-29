const jwt = require("jsonwebtoken");
const config = require('../configs/app.config');
const { isMatched } = require("./hashService");

const generateToken = (user) => {
  let { _id, username,email, name } = user;

  const payload = {
    id: _id,
    username,
    email,
    name,
  };

  let token = jwt.sign(payload, config.JWT_SECRET_KEY , {
    expiresIn: config.JWT_VALIDITY,
  });

  return token;
};

const verifyToken = (token) => {

    let value='';
    let error='';

    try{
        let data = jwt.verify(token, config.JWT_SECRET_KEY);

        let {iat, exp, ...rest} = data;

        value = rest;

    }catch(er){
        error = er;
    }

    return {value, error};

};

module.exports = {
  generateToken,
  verifyToken,
};
