(function(){
    angular
        .module("helloWorldApp")
        .controller("homeController",homeController);

    function homeController($scope){
        $scope.home="Welcome to Home";
    }
})();
