(function(){
    angular.module("FormMakerApp")
        .controller("profileController",RegisterController);

    function RegisterController($scope,$location,UserService){
        $scope.location=$location;
        $scope.update=update;



        function update(u)
        {
            UserService
                .updateUser(
                    this.userId,
                    {
                        "username": u.username,
                        "firstName": u.firstName,
                        "lastName": u.lastName,
                        "password": u.password,
                        "email": u.email
                    }
                )
                .then(function(response){
                    console.log(response);
                    UserService.setCurrentUser(response);
                });
        }

        function alert()
        {

        }
    }

})();
