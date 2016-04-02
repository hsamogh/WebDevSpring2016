var q = require("q");


module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    //creating an API
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    //***********************************************************
    //function to create new user
    //***********************************************************

    function createUser(user) {

        var deferred = q.defer();


        UserModel.create(user, function (err, doc) {
            if (err) {
               // console.log(err);
                deferred.reject(err);
            } else {
               // console.log(doc);
                deferred.resolve(doc);
            }
        });


        return deferred.promise;
    }

    // ********************************************************
    //Function to delete a User . The input taken is user-id
    // ********************************************************

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                  //  console.log(doc);

                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    // *************************************************************************
    //Function to update User data
    // *************************************************************************

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(
            userId,
            {$set: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password
            }},
            {new: true},
            function (err, doc) {
               // console.log(doc);

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    // *************************************************************************
    // Function to find user by username
    //**************************************************************************

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, function (err, doc) {
            //console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // ************************************************************************
    // Function to find user by Credentials
    // ************************************************************************

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne({username: credentials.username, password: credentials.password}, function (err, doc) {
           // console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // ***************************************************************************
    // Function to find user by ID
    // ***************************************************************************

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
          //  console.log("In Models");
           // console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //*****************************************************************************
    // Function to find All Users
    //*****************************************************************************

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({}, function (err, doc) {
           // console.log(doc);

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};