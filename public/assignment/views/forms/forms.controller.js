(function(){
    angular.module("FormMakerApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,FormService,$rootScope){
        $scope.location=$location;
        $scope.deleteForm=deleteForm;
        $scope.addForm=addForm;
        $scope.selectForm=selectForm;
        $scope.updateForm=updateForm;





        function deleteForm(u)
        {
            FormService.deleteFormById(u._id);
            console.log("Deleted");
            $location.url("\\");
        }

        function selectForm(u)
        {
            FormService.findFormById(u._id);
            console.log("Searched");
            $location.url("\\");
        }

        function addForm(u)
        {
            FormService.createFormForUser(u);
            console.log("Added");
            $location.url("\\");
        }

        function updateForm(u)
        {
            FormService.updateFormById(u._id,u);
            console.log("Added");
            $location.url("\\");
        }

        function alert()
        {

        }
    }

})();

