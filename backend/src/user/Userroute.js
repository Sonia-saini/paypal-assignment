const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("./Usermodel");
const { loginValidator } = require("../Middlewares/loginvalidator");
const { registerValidator } = require("../Middlewares/registrvalidate");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", registerValidator, async (req, res) => {
  const { name, email, password} = req.body;

  try {
    const user = await Usermodel.find({ email });
    console.log(user.length > 0);
    if (user.length === 0) {
      bcrypt.hash(password, 8, async (err, password) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Usermodel({
            name,
            email,
            password: password,
            admin:false
          });
          await user.save();
          res.status(201).send("Registration Successful");
        }
      });
    } else {
      res.send("this email id already exists");
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Register.");
    res.status(401).send(error);
  }
});

userRouter.post("/login", loginValidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hash_password = user[0].password;
    if (user && hash_password) {
      console.log(user, "login id", user[0]._id);
      var token = jwt.sign({ userID: user[0]._id }, process.env.key, {
        expiresIn: "24h",
      });
      
      
      res.status(200).send({
        msg: "LogIn successfully",
        token: token,
       
        
      });
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Login.");
    console.log(error);
  }
});


module.exports = { userRouter };
