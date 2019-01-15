const express = require("express");
const route = express.Router();

const passport = require("passport");

const orgController = require("../controllers/org.controller");
const bodyParser = require("body-parser");

route.use(bodyParser.json());

route.post("/", passport.authenticate('jwt', {session:false}), (req,res)=>{
    orgController.createOrg(req, res);
});

route.post("/:orgId/", passport.authenticate('jwt', {session:false}), (req,res)=>{
    orgController.createPost(req, res, req.params.orgId);
});

route.get("/", passport.authenticate('jwt', {session:false}), (req,res)=>{
    orgController.getOrgs(req, res);
});

route.get("/:orgId/", passport.authenticate('jwt', {session:false}), (req,res)=>{
    orgController.getPosts(req, res, req.params.orgId);
});

module.exports = route;