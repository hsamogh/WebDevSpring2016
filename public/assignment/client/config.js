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
                    controller: "RegisterController",
                    controllerAs: "m"

                })
                .when("/login", {
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "m"

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    controllerAs: "m"

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "profileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "m"
                })
                .otherwise({
                    redirectTo: "/home",
                    controllerAs: "m"
                });
        })

})();