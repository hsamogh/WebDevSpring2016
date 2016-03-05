/**
 * Created by Amogh on 3/4/2016.
 */(function(){
    angular
        .module("FormMakerApp")

        .controller("SideBarController",function($scope){
            $scope.location=location.url();
        })
        })();