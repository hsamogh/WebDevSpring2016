/**
 * Created by Amogh on 3/18/2016.
 */

module.exports = function(app, userModel) {

    //REST Links

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserByID);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", getCurrentUser);



    //***********************************************************
    // Function to Create a User
    //***********************************************************
    function createUser(req, res){
        userModel.createUser(req.body)
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
        if (req.session.currentUser){
            res.json(req.session.currentUser);
        }
        else{
            res.send("alice");
        }
    }

    //***********************************************************
    // Function to find all users
    //***********************************************************

    function findAllUsers(req, res){
        userModel.findAllUsers()
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
    // Function to find users by credentials
    //***********************************************************

    function findUserByCredentials(req, res){
        userModel.findUserByCredentials({
                username : req.query.username,
                password: req.query.password
            })
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
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

};