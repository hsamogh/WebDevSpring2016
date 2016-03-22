(function(){
    angular
        .module("helloWorldApp")
        .controller("profileController",profileController);

    function profileController($scope){
        $scope.profileMessage="Welcome to Profile Page";
    }
})();