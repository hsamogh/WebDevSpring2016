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
            deleteUserById: deleteUserById,
            login:login
        };
        return api;

        function setCurrentUser (user) {
            console.log("user.service.client.js"+"Setting current user and current user");
            console.log("user.service.client.js"+$rootScope.user);
            $rootScope.user = user;
            $rootScope.currentUser=user;
            console.log("user.service.client.js"+$rootScope.currentUser);

        }
        function findAllUsers(){
            console.log("user.service.client.js"+"/api/assignment/user");
            return $http.get("/api/assignment/user");
        }

        function getCurrentUser () {
            return $http.get("/api/assignment/loggedin");
        }

        function deleteUserById(userId)
        {
            console.log("user.service.client.js"+"/api/assignment/user/" + userId);
            return $http.delete("/api/assignment/user/" + userId);

        }


        function createUser (user) {
            console.log("Client User Service");
           console.log(user);
            return $http.post("/api/assignment/user", user);
        }



        function findUserByCredentials(user) {
            console.log(user);
            console.log("user.service.client.js"+"/api/assignment/user?username=" + user.username + "&password=" + user.password);
            return $http.get("/api/assignment/user?username=" + user.username + "&password=" + user.password,user);
        }

        function findUserByUsername (username) {
            console.log("user.service.client.js"+"/api/assignment/user?username=" + username);
                return $http.get("/api/assignment/user?username=" + username);

        }

        function updateUser (userid,currentUser) {
            console.log("user.service.client.js"+"/api/assignment/user/" + userid+currentUser);
            return $http.put("/api/assignment/user/" + userid, currentUser);}

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/user/logout")
                .success(function () {
                    $rootScope.user = null;
                });
        }

    }
})();