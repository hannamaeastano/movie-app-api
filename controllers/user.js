//[SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('../auth');
const { errorHandler } = auth;

//[SECTION] User Registration
module.exports.registerUser = (req, res) => {
  if (!req.body.email.includes('@')) {
    return res.status(400).send({ message: 'Invalid email format' });
  } else if (req.body.password.length < 8) {
    return res.status(400).send({ message: 'Password must be at least 8 characters long' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin || false,
    });

    return newUser
      .save()
      .then((result) => res.status(201).send({ message: 'User registered successfully', user: result }))
      .catch((error) => errorHandler(error, req, res));
  }
};

//[SECTION] User Login
module.exports.loginUser = (req, res) => {
  if (req.body.email.includes('@')) {
    return User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'No email found' });
        } else {
          const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
          if (isPasswordCorrect) {
            const token = auth.createAccessToken(user);
            return res.status(200).send({ // Changed from 201 to 200
              access: token
            });
          } else {
            return res.status(401).send({ message: 'Incorrect email or password' });
          }
        }
      })
      .catch((error) => errorHandler(error, req, res));
  } else {
    res.status(400).send({ message: 'Invalid email format' });
  }
};

//[SECTION] Get User Details
module.exports.getUserDetails = (req, res) => {
  return User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: 'Invalid signature' });
      } else {
        user.password = '';
        return res.status(200).send(user);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};