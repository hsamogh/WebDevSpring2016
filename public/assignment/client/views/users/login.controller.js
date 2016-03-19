(function(){
    angular.module("FormMakerApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService,$rootScope){
        $scope.location=$location;
        $scope.login=login;




        function login (user) {
            function alert()
            {

            }


            var user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                console.log(user);
                $rootScope.currentUser = user; // you set the user to the rootScope here
                UserService.setCurrentUser(user); // you set it again?
                $location.url("/profile");
            }
        }

    }

})();