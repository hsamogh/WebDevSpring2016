(function(){
   angular
       .module("helloWorldApp",["ngRoute"])
       .controller("helloWorldController",helloWorldController);


   function helloWorldController($scope,$location){
      $scope.$location=$location;
      $scope.hello="Hello WOrld from AngularJS";

      var vm=this;

      vm.names=['amogh','abhiram','hemanth','vikas'];
      vm.courses=[
         {  title:"Java 101",
            seatsleft:101,
            startdate:'04/03/2012'
           },
         {  title:"C#",
            seatsleft:21,
            startdate:'04/22/2012'
         },
         {  title:"Web Dev",
            seatsleft:41,
            startdate:'04/09/2012'
         }

      ]


      function printHello(){

          $scope.hello="<h1>Hell0</h1>";
          $scope.hi="Hi";

      }

      $scope.add23=function add23(){
         $scope.val23=5;
      }

      $scope.add45=function add45(a,b){
         $scope.val45=a+b;
      }

      $scope.setAuthor=function setAuthor(title){
         $scope.myAuthor=title;
      }


      $scope.SetHelloWorld=function setHelloWorld(){
         console.log("ENtering Hello World");
         $scope.valhw="HelloWorld ";
      }
   }
})();