const userModel = require("../models/user.model");
const authUtil = require("../utils/auth.util");
const jwt = require("jsonwebtoken");

function getOrganization(email) {
    return "5c278e08bcc20c5ff8f16c78";
}

module.exports = {
    getUsers: (req, res) => {
        userModel.find()
            .then((data) => {
                res.status(200);
                res.send(data);
            })
            .catch((err) => {
                res.status(500);
                res.send(err.message);
            });
    },

    createUser: (req, res) => {
        const hashedPassword = authUtil.getHashedPassword(req.body.password);
        const organization = getOrganization(req.body.email);

        const user = new userModel({
            email: req.body.email,
            password: hashedPassword.passwordHash,
            salt: hashedPassword.salt,
            name: req.body.name,
            organization: organization,
            isActive: false
        });

        user.save()
            .then((data) => {
                res.status(201);
                res.send(data);
            })
            .catch((err) => {
                res.status(500);
                res.send(err.message);
            });
    },

    loginUser: (req, res) => {
        userModel.findOne({ 'email': req.body.email })
            .then((data) => {
                if (data) {
                    const hashedPassword = authUtil.getHashedPassword(req.body.password, data.salt);
                    if (data.password === hashedPassword.passwordHash) {
                        res.status(200);
                        res.send("Login Successfull");
                    } else {
                        res.status(401);
                        res.send("Unauthorized");
                    }
                }else{
                    res.status(401);
                    res.send("Unauthorized");
                }
            })
            .catch((err) => {
                res.status(500);
                res.send(err.message);
            });
    },

    authenticate: (req, res) => {
        userModel.findOne({ 'email': req.body.email })
            .then((data) => {
                if (data) {
                    const hashedPassword = authUtil.getHashedPassword(req.body.password, data.salt);
                    if (data.password === hashedPassword.passwordHash) {
                        const user = {
                            _id : data._id,
                            email : data.email,
                            name : data.name,
                            isActive : data.isActive,
                            organization : data.organization
                        };
                        const token = jwt.sign(user, "secret", {
                            expiresIn: 30000
                        });
                        res.status(200);
                        res.json({success: true, token: token});
                    } else {
                        res.status(401);
                        res.send("Unauthorized");
                    }
                }else{
                    res.status(401);
                    res.send("Unauthorized");
                }
            })
            .catch((err) => {
                res.status(500);
                res.send(err.message);
            });
    },

    resetPassword: function(req, res){
        res.status(200);
        res.send("Password Reset Triggered!!");
    }
};