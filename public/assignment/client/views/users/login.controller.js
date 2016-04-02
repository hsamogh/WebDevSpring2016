(function(){
    angular.module("FormMakerApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location, $scope) {


        var vm = this;
        vm.login = login;
        function init(){

        }
        init();
        function login(user) {

            UserService
                .findUserByCredentials(user)
                .then(function (response) {
                    if(response.data != null){
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }

                    else {
                        vm.password = null;
                        $scope.message = "Invalid Credentials";
                    }
                });

        }



    }


})();