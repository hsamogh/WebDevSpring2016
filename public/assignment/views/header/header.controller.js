(function(){
    angular.module("FormMakerApp",["ng-route"])
        .controller("HeaderController",function($scope,$location){

            $scope.$location = $location;
            $scope.logout = logout;
        })

    function logout() {
        UserService.setCurrentUser(null,$scope,$location);
        $location.url("/home");
    }

});