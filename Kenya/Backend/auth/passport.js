const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const userIndex = require("./../user");
const utilityIndex = require("./../utility");
const configIndex = require("./../config");
const validPassword = require('../utility/passwordUtils').validPassword;
const statusCodes = require('http-status-codes').StatusCodes;
var jwt = require('jsonwebtoken');
const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {

    userIndex.userModel.findOne({ email: email })
        .then((user) => {
            if (!user) { return done(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CAUSE(configIndex.message.ERROR_USER_NOT_FOUND)), null ) }
            var passwordMatch = utilityIndex.encryption.compare(password, user.password)
            .then(function(passwordMatch) {
                if (passwordMatch) {
                    return done(null, user);
                } else {
                    return done(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CAUSE(configIndex.message.ERROR_INVALID_PASSWORD)), null);
                }
            })
            .catch((err) => {   
                done(err);
            });
            
            
        })
        .catch((err) => {   
            done(err);
        });

}

// using local statergy
const strategy  = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

// using bearer statergy
passport.use(new BearerStrategy(
    function(token, done) {
    // validate token being passed as bearer token
    var userTokenConfig = utilityIndex.factory.getUserTokenConfig(process.env.PROFILE);
    jwt.verify(token,userTokenConfig.secret, function(err, decoded) {
        if (err) {
            // console.log("error in verify token  ",err);
            return done(err,null);
        }
        else if(!decoded) {
            // console.log("No  token  ",err);
            return done(null, false);
        }
        else {
            // console.log("yes  token  ",decoded);
            return done(null, decoded);
        }
    });
      /* User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      }); */
    }
  ));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
