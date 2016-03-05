(function(){
    angular.module("FormMakerApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,UserService){
            $scope.location=$location;
            $scope.register=register;



        function register(u)
        {
            UserService.createUser(u,alert);
            console.log("Registered");
        }

        function alert()
        {

        }
        }

})();