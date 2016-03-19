(function() {
    angular
        .module("FormMakerApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {

            createFormForUser:createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            findFormById:findFormById,
            updateFormById: updateFormById
        };
        return api;


        function createFormForUser (userId,form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }


        function deleteFormById(formId)
        {
            return $http.delete("/api/assignment/form/" + formId);

        }




        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }





        function findFormById (username) {
            return $http.get("/api/assignment/user/" + username + "/form");
        }

        function updateFormById (form_id,newForm) {
            return $http.put("/api/assignment/form/" + form_id, newForm);
        }
    }
})();