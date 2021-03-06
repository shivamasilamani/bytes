const express = require("express");
const route = express.Router();

const userController = require("../controllers/user.controller");
const bodyParser = require("body-parser");

route.use(bodyParser.json());

route.get("/", (req, res)=>{
    userController.getUsers(req,res);
});

route.post("/register", (req, res)=>{
    userController.createUser(req, res);
});

route.post("/login", (req, res)=>{
    userController.loginUser(req, res);
});

route.post("/reset", (req, res)=>{
    userController.resetPassword(req, res);
});

route.post("/authenticate", (req, res)=>{
    userController.authenticate(req, res);
});

module.exports = route;