const orgModel = require("../models/org.model");

module.exports = {
    createOrg : (req, res)=>{
        const org = new orgModel({
            name : req.body.name,
            type : req.body.type
        });

        org.save()
        .then((data)=>{
            res.status(201);
            res.send(data);
        })
        .catch((err)=>{
            res.status(500);
            res.send(err.message);
        })
    },

    createPost : (req,res, orgId)=>{

        let post = {
            owner : req.body.owner,
            text  : req.body.text
        };

        orgModel.findOneAndUpdate(
            {_id: orgId},
            {$push : { "posts" : post } },
            {new : true},
            (err, data)=>{
                if(err){
                    res.status(500);
                    res.send(err.message);
                }else{
                    res.status(201);
                    res.send(data);
                }
            }
        );
    },

    getOrgs: (req, res)=>{
        orgModel.find()
        .then((data)=>{
            res.status(200);
            res.send(data);
        })
        .catch((err)=>{
            res.status(500);
            res.send(err.message);
        })
    },

    getPosts: (req, res, orgId)=>{
        orgModel.findById(orgId)
        .then((data)=>{
            res.status(200);
            res.send(data.posts);
        })
        .catch((err)=>{
            res.status(500);
            res.send(err.message);
        })
    }
};