const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const userModel = require("../models/user.model");
const authUtil = require("../utils/auth.util");

module.exports = function(passport){
    const options = {
        jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : "secret"
    };

    passport.use(new jwtStrategy(options, function(jwtPayload, done){
        userModel.findOne({ '_id': jwtPayload._id }, function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){
                done(null, user);
            }else{
                done(null, false);
            }
        })
    }));
};