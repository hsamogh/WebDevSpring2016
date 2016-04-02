(function(){
    angular.module("FormMakerApp")
        .controller("profileController",RegisterController);

    function RegisterController($scope,$location,UserService){
        $scope.location=$location;
        $scope.update=update;



        function update(u)
        {
            var m = this;

            function init() {
                // Initialization statements
                if (UserService.getCurrentUser()) {
                    var currUser = UserService.getCurrentUser();
                    m.userId = currUser._id;
                    m.username = currUser.username;
                    m.password = currUser.password;
                    m.firstName = currUser.firstName;
                    m.lastName = currUser.lastName;
                    m.userEmail = currUser.email;
                } else {
                    $location.path("#/home");
                }
            }
            init();



            UserService
                .updateUser(
                   m.userId,
                    {
                        "username": m.username,
                        "firstName": m.firstName,
                        "lastName": m.lastName,
                        "password": m.password,
                        "email": m.email
                    }
                )
                .then(function(response){
                    console.log(response);
                    alert("Updated");
                    UserService.setCurrentUser(response);
                });


        }

        function alert()
        {

        }
    }

})();
