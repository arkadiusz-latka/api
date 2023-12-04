const { insertUserDB, getUserByField } = require("../database/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { API_SECRET } = require('../env');

async function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if(!password || password.length < 4) {
        res.status(404);
        return res.json({message: 'invalid password'});
    }

    if(!email || email.length < 4) {
        res.status(404);
        return res.json({message: 'invalid email'});
    }

    try {
        await insertUserDB({
            email,
            password,
        });
        res.send({
            message: "Register successfull",
        });
    } catch(e) {
        res.status(400).send({message: e.message});
    }
};

async function signIn (req, res) {
    const user = await getUserByField('email', req.body.email);
    if(!user) {
        return res.status(401)
          .send({
            message: "Invalid Password or Email!"
          });

    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401)
        .send({
          message: "Invalid Password!"
        });
    }

    const token = jwt.sign({
      id: user._id.toString()
    }, API_SECRET, {
      expiresIn: 86400
    });

    res.status(200)
      .send({
        message: "Login successfull",
        accessToken: token,
      });
  };

async function user(req, res) {
  const user = req.user;
  return res.json(user);
};


module.exports = {
  signUp,
  signIn,
  user,
}