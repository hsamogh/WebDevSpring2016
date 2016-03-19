var app= angular.module("helloWorldApp",[]);

app.controller("helloWorldController",printHello);

function printHello($scope){
   $scope.hello="Hello World from Angular JS";
}
