/**
 * Created by Amogh on 3/20/2016.
 */
(function(){
    angular
        .module("helloWorldApp")
        .config(routeProvider);

    function routeProvider($routeProvider){
        console.log("In router");
        $routeProvider
            .when("/home",{
                templateUrl:"home.html",
                controller:"homeController"
            })
            .when("/profile",{
                templateUrl:"profile.html",
                controller:"profileController"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();