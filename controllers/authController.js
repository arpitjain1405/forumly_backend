const { User, validateUser, validateLogin } = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered");

  user = await new User({
    name,
    email,
    password,
    isAdmin: false
  });

  user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.status(201).send({ name, email });
};

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if(!user) return res.status(401).send("Invalid credentials.");

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword) return res.status(401).send("Invalid crendentials");

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, "jwtPrivateKey");
  res.header('x-auth-token', token).send(token);
};
