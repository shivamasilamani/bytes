const userModel = require("../models/user.model");
const crypto = require("crypto");

function getHashedPassword(password, salt) {
    const length = 16;

    if (!salt) {
        const randomSalt = crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);

        salt = randomSalt;
    }

    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let passwordHash = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: passwordHash
    };
}

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
        const hashedPassword = getHashedPassword(req.body.password);
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
                    const hashedPassword = getHashedPassword(req.body.password, data.salt);
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
    }
};