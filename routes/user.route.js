const express = require("express");
const route = express.Router();

const userController = require("../controllers/user.controller");
const bodyParser = require("body-parser");

route.use(bodyParser.json());

route.get("/", (req, res)=>{
    userController.getUsers(req,res);
});

route.post("/", (req, res)=>{
    userController.createUser(req, res);
});

module.exports = route;