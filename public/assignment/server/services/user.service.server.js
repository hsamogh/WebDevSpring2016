/**
 * Created by Amogh on 3/18/2016.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    //REST Links

    app.post  ('/api/assignment/login', login);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserByID);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", getCurrentUser);
    app.post("/api/assignment/user/logout", logout);





    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }



    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {

                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        console.log("error in bcrypting !!!!!");
                        return done(null, false);

                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }




    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function login(req, res) {
        var user = req.user;
        return (res.json(user));
    }





    //***********************************************************
    // Function to Create a User
    //***********************************************************
    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        user.roles = ["student"];

        userModel
            .findUserByUsername(user.username)
            .then(
                function (doc) {
                    if (doc) {
                        res.json(null);
                    } else {
                        return userModel.createUser(user);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    if (doc) {
                        // use the passport helper function to login the newly created user
                        req.login(doc, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(doc);
                            }
                        });
                    }
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    //***********************************************************
    // Function to Update a User
    //***********************************************************
    function updateUser(req, res){
        userModel.updateUser(req.params.id, req.body)
            .then(
                function (doc) {
                    req.session.currentUser = req.body;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    //***********************************************************
    // Function to delete  a User
    //***********************************************************
    function deleteUser(req, res){
        userModel.deleteUser(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    //***********************************************************
    // Function to Get current User
    //***********************************************************
    function getCurrentUser(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    //***********************************************************
    // Function to find all users
    //***********************************************************

    function findAllUsers(req, res){
        console.log("why are u still here???");
        console.log(req.query);
        userModel.findUserByCredentials(req.query)
            .then(
                function (user) {
                    console.log("Server found user: " + JSON.stringify(user));
                    if (user && bcrypt.compareSync(req.query.password, user.password)) {
                        req.session.currentUser = user;
                        res.json(user);
                    } else {
                        res.status(400).send(err);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    //***********************************************************
    // Function to find users by credentials
    //***********************************************************

    function findUserByCredentials(req, res){
        var username= req.query.username;
        var password= req.query.password;
        console.log("find usr"+ username+" "+password);

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Server found user: " + JSON.stringify(user));
                    if (user && bcrypt.compareSync(password, user.password)) {
                        req.session.user = user;
                        res.json(user);
                    } else {
                        res.status(400).send(err);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //***********************************************************
    // Function to find users by id
    //***********************************************************

    function findUserByID(req, res){
        userModel.findUserByID(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }


    //***********************************************************
    // Function to find Users by username
    //***********************************************************

    function findUserByUsername(req, res){
        console.log("USRNME:"+req.params.username);
        userModel.findUserByUsername(req.params.username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }



    //***********************************************************
    // Function to Logout
    //***********************************************************

    function logout(req, res){
        req.session.destroy();
        res.send(null);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

};