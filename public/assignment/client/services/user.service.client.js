(function() {
    angular
        .module("FormMakerApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var model = {

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
        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user/" + userId);

        }


        function createUser (user) {
            return $http.post("/api/assignment/user", user);
        }



        function findUserByCredentials(username,password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername (username) {
                return $http.get("/api/assignment/user?username=" + username);

        }

        function updateUser (userid,currentUser) {
            return $http.put("/api/assignment/user/" + userid, currentUser);}
    }
})();