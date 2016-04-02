
(function () {
    "use strict";
    angular
        .module("FormMakerApp")
        .controller("FormController", formController);

    function formController($location, FormService, UserService) {
        var formObject = this;
        var userId = null;


        function init() {
            if (UserService.getCurrentUser()) {
                console.log("Authenticated");
                formObject.loadFormFields = loadFormFields;
                formObject.addForm = addForm;
                formObject.selectForm = selectForm;
                formObject.updateForm = updateForm;
                formObject.deleteForm = deleteForm;

                userId = UserService.getCurrentUser()._id;

                console.log(userId);
                FormService
                    .findAllFormsForUser(userId)
                    .then(function(response){
                        console.log("List of forms");
                        console.log(response.data);
                        formObject.myforms = response.data;
                        console.log(formObject.myforms);
                    });
            } else {
                $location.path("#/home");
            }
        }

        init();

        function loadFormFields(formId) {
            console.log("/fields/"+formId);
            $location.url("#/fields/"+formId);
        }

        function updateForm() {

            formObject.newForm.title = formObject.formName;
            FormService
                .updateFormById(
                    formObject.newForm._id,
                    formObject.newForm
                )
                .then(function(response){
                    console.log(response);
                    formObject.formName = "";
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            formObject.myForms = response.data;
                            formObject.newForm = null;
                        });
                });
        }

        function deleteForm(formId) {
            console.log("In delete");
            FormService
                .deleteFormById(formId)
                .then(function(response) {
                    console.log(response);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            formObject.myForms = response.data;
                        });
                });
        }

        function selectForm(form) {
            formObject.formName = form.title;
            formObject.newForm = form;
        }

        function addForm(fname) {
            FormService
                .createFormForUser(
                    userId,
                    {title: fname,
                    userId: userId}
                )
                .then(function(response) {
                   // console.log(response.data);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                          //  console.log(response);
                            formObject.formName = "";
                            formObject.myForms = response.data;
                        });
                });
        }




}
})();