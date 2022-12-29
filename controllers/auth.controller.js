const { response } = require("express");
const Joi = require("joi");
const User = require("../models/User");
const hashService = require("../services/hashService");
const tokenService = require("../services/tokenService");

const register = async (req, res) => {
  //check if user already exists

  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    const existsUser = await User.findOne({ email: req.body.email });

    if (existsUser) {
      return res.json({
        status: "failed",
        message: "User already exists with this email",
      });
    }

    value.password = await hashService.hashPassword(value.password);

    const user = new User(value);

    let savedUser = await user.save();

    res.json({ status: "success", message: "User registered" });
  } else {
    res.status(500).json({ message: error.message() });
  }
};

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (!error) {
    const user = await User.findOne({ email: value.email });

    if (!user) {
      return res.json({
        status: "failed",
        message: "No user found with this email",
      });
    }

    //now compare password

    const matched = await hashService.isMatched(user.password, value.password);

    if (matched) {
      //generate token

      const token = tokenService.generateToken(user);

      return res.json({
        status: "success",
        message: "Logged In",
        token: token,
      });
    } else {
      return res.json({ status: "failed", message: "Password Incorrect" });
    }
  } else {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = (req, res) => {

    let user = req.user;

    return res.send({user});
}

module.exports = { register, login, getUser};
