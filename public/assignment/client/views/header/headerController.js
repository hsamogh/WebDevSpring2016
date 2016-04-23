"use strict";
(function(){
    angular
        .module("FormMakerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope){
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();


        vm.logout = logout;

        function logout() {

            UserService
                .logout()
                .then(function(user){
                    $location.url("/home");
                });
        }

    }
})();