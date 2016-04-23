(function(){
    angular.module("FormMakerApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location, $scope, $rootScope) {


        var vm = this;
        vm.login = login;

        function login(user) {

            UserService
                .findUserByCredentials(user)
                .then(function (response) {
                    if(response.data != null){
                        $rootScope.user = response.data;
                        $rootScope.currentUser = response.data;
                        //UserService.setCurrentUser(response.data);

                        if($rootScope.user == null){

                            $location.url('/home') ;
                        }
                        else{
                            console.log("User selected");
                            console.log($rootScope.user);
                            $location.url('/profile') ;
                        }
                    }

                    else {
                        vm.password = null;
                        $scope.message = "Invalid Credentials";
                    }
                });

        }



    }


})();