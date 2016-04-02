(function() {
    angular
        .module("FormMakerApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var api = {

            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            deleteUserById: deleteUserById
        };
        return api;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }
        function findAllUsers(){
            console.log("/api/assignment/user");
            return $http.get("/api/assignment/user");
        }

        function getCurrentUser () {
            //return $http.get("/api/assignment/loggedin");
            console.log("In user service");
            console.log($rootScope.currentUser[0]);
            return $rootScope.currentUser[0];
        }

        function deleteUserById(userId)
        {
            console.log("/api/assignment/user/" + userId);
            return $http.delete("/api/assignment/user/" + userId);

        }


        function createUser (user) {
            console.log("Client User Service");
           console.log(user);
            return $http.post("/api/assignment/user", user);
        }



        function findUserByCredentials(user) {
            console.log("/api/assignment/user?username=" + username + "&password=" + password);
            return $http.get("/api/assignment/user",user);
        }

        function findUserByUsername (username) {
            console.log("/api/assignment/user?username=" + username);
                return $http.get("/api/assignment/user?username=" + username);

        }

        function updateUser (userid,currentUser) {
            console.log("/api/assignment/user/" + userid+currentUser);
            return $http.put("/api/assignment/user/" + userid, currentUser);}
    }
})();