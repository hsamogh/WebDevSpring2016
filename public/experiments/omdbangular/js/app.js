(function(){
    console.log("In App.js");
    angular
        .module("omdbapp",[])
        .controller("omdbController",omdbController);

    function omdbController($scope){

        var vm=this;
        vm.movies= [
            {
                title:"Star Wars",
                id:111,
                releaseYear:1991
            },
            {
                title:"anaconda",
                id:222,
                releaseYear:1999
            },
            {
                title:"Star Wars",
                id:222,
                releaseYear:1997
            }
        ];
        vm.searchresult=[];

        $scope.add=function(newId,newTitle,newYear){

            var newMovie={
                id:newId,
                title:newTitle,
                releaseYear:newYear
            };
            vm.movies.push(newMovie);

        };

        $scope.update=function(mid,mtitle,myor){
            var newMovie={
                id:mid,
                title:mtitle,
                releaseYear:myor
            };

            console.log("In update");

            for(var m in vm.movies){
                if(vm.movies[m].id==newMovie.id){
                    vm.movies.splice(m,1);
                    vm.movies.push(newMovie);
                }
            }
        };

        $scope.select = function(mov){
            console.log(mov);
        };


        $scope.search= function search(movieName){
            vm.searchresult=[];
            console.log("In search function");
            for (var i in vm.movies){
                if(vm.movies[i].title==movieName){
                    vm.searchresult.push(vm.movies[i]);
                    console.log(vm.movies[i]);
                }
            }

        };

        $scope.delete=function(movie){
            for(var m in vm.movies){
                if(vm.movies[m].id==movie.id && vm.movies[m].title==movie.title && vm.movies[m].releaseYear==movie.releaseYear){
                    vm.movies.splice(m,1);
                }
            }
        }
    }
})()
