const express = require("express");
const route = express.Router();

const feedController = require("../controllers/feed.controller");

route.get("/", (req,res)=>{
    feedController.getAllOrgs(req, res);
});

route.get("/:id", (req,res)=>{
    res.send("Feed Get " + req.params.id + "....");
});

module.exports = route;