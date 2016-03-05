(function() {
    angular
        .module("FormMakerApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]                },
                {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]                },
                {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]                },
                {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]                }
            ],
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            deleteUserById: deleteUserById
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }
        function findAllUsers(callback){
            callback($rootScope.users);
            return $rootScope.users;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function deleteUserById(userId)
        {
            for(var a=0 ; a< $rootScope.users.length; a++){
                if($rootScope.users[a]._id==userId){
                    $rootScope.users[a].slice();
                }
            }

        }


        function createUser (user) {
            var user = {
                username: user.username,
                password: user.password
            };
            model.users.push(user);
            return user;
        }



        function findUserByCredentials(username,password) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function updateUser (userid,currentUser) {
            var user = findUserByUsername (currentUser.username);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                return user;
            } else {
                return null;
            }
        }
    }
})();