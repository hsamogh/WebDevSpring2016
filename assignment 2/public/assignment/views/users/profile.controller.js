(function(){
    angular.module("FormMakerApp")
        .controller("profileController",RegisterController);

    function RegisterController($scope,$location,UserService){
        $scope.location=$location;
        $scope.update=update;



        function update(u)
        {
            UserService.updateUser(u,alert);
            console.log("Updated");
            $location.url("\\");
        }

        function alert()
        {

        }
    }

})();
