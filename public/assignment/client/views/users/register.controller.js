(function () {
    "use strict";
    angular
        .module("FormMakerApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService,$rootScope) {
        var vm = this;
        vm.register = register;

        function init() {
            // Initialization statements
        }
        init();

        function register(User) {
            if (User.password != User.vpassword) {
                console.log("Bad password");
                return false;
            }

            var newUser = {
                "firstName": "",
                "lastName": "",
                "username": User.username,
                "password": User.password,
                "email": User.email.split(',')
                //"phones": ["999-999-9999"],
            };

            UserService
                .createUser(newUser)
                .then(function(response) {
                  //  console.log(response.data);
                  //  console.log(response.config.data);
                    $rootScope.user=response.config.data;
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();