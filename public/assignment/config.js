(function(){
    angular
        .module("FormMakerApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl:"views/home/home.view.html",
                    controller: "MainController"

                })
                .when("/logout", {
                    templateUrl:"views/home/home.view.html",
                    controller: "HeaderController"

                })
                .when("/home", {
                    templateUrl:"views/home/home.view.html",
                    controller: "homeController"

                })
                .when("/register", {
                    templateUrl:"views/users/register.view.html",
                    controller: "RegisterController"

                })
                .when("/login", {
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController"

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "profileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "profileController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        })

})();