(function () {

    angular
        .module("FormMakerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$scope) {
        var vm = this;


        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            console.log("HELLO");
            if (user.password == user.vpassword){

                var newUser = {
                    "._id": (new Date).getTime(),
                    "firstName": null,
                    "lastname":null,
                    "username":user.username,
                    "password":user.password,
                    "email":user.email,
                    "roles": []
                };
                UserService.createUser(newUser)
                    .then(function(response){

                        UserService.setCurrentUser(newUser);
                        $location.path('/profile');
                    });
            }else{
                alert("passwords do not match");
            }



        }
    }
})();