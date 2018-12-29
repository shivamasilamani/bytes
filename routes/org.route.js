const express = require("express");
const route = express.Router();

const orgController = require("../controllers/org.controller");
const bodyParser = require("body-parser");

route.use(bodyParser.json());

route.post("/", (req,res)=>{
    orgController.createOrg(req, res);
});

route.post("/:orgId/", (req,res)=>{
    orgController.createPost(req, res, req.params.orgId);
});

route.get("/", (req,res)=>{
    orgController.getOrgs(req, res);
});

route.get("/:orgId/", (req,res)=>{
    orgController.getPosts(req, res, req.params.orgId);
});

module.exports = route;