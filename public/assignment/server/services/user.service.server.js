/**
 * Created by Amogh on 3/18/2016.
 */

// /api/assignment/user?username=alice&password=alice
module.exports = function(app, userModel) {
    app.get("/api/hello",HelloUser)
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?username=:username&password=:password", getUserByCredentials);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", getUserByUname);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", delUser);

    function HelloUser(req,res){
        console.log("HELLO");
        res.send("<h1> HELLO </h1>");
    }
    function createUser(req, res) {
        var user = req.body;
        var userList = userModel.createNewUser(user);
        res.json(userList);
    }

    function findAllUsers(req, res) {

        if (req.query.username && req.query.password) {
            return getUserByCredentials(req, res);
        } else if (req.query.username) {
            return getUserByUname(req, res);
        } else {
            return findAllUsers(req, res);
        }

        var userList = userModel.findAll();
        res.json(userList);
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findById(userId);
        res.json(user);
    }

    function getUserByUname(req, res) {
        var username = req.query.username;
        console.log("Username"+username);
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function getUserByCredentials(req, res) {

        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId, user);
        res.json(updatedUser);
    }

    function delUser(req, res) {
        var userId = req.params.id;
        var result = userModel.deleteUser(userId);
        res.json(result);
    }

}