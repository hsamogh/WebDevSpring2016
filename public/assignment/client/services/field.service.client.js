(function () {
    "use strict";

    angular
        .module("FormMakerApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {
        var api = {
            getFieldsForm: getFieldsForm,
            deleteFieldForm: deleteFieldForm,
            createFieldForm: createFieldForm,
            getFieldForm: getFieldForm,
            updateField: updateField
        };
        return api;

        function createFieldForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})();