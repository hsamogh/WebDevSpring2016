
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
                formObject.loadFormFields = loadFormFields;
                formObject.addForm = addForm;
                formObject.selectForm = selectForm;
                formObject.updateForm = updateForm;
                formObject.deleteForm = deleteForm;



                userId = UserService.getCurrentUser()._id;

                FormService
                    .findAllFormsForUser(userId)
                    .then(function(response){
                        console.log(response);
                        formObject.myForms = response.data;
                    });
            } else {
                $location.path("#/home");
            }
        }

        init();

        function loadFormFields(formId) {
            $location.url("/fields/"+formId);
        }

        function updateForm(formName) {
            if(formObjectb.index != -1 && formName != null){

            var selectedForm = formObject.myForms[formObject.index];
            console.log(selectedForm);
            selectedForm.title = formName;

            FormService.updateFormById(selectedForm._id, selectedForm)
            }else{
                console.log("Nothing ")
            }
        }

        function deleteForm(formId) {
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

        function selectForm(index) {
            formObject.formName = formObject.forms[index].title;
            formObject.newForm = formObject.forms[index];
            formObject.index=index;
        }

        function addForm(fname) {
            FormService
                .createFormForUser(
                    userId,
                    {title: fname}
                )
                .then(function(response) {
                    console.log(response);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response){
                            console.log(response);
                            formObject.formName = "";
                            formObject.myForms = response.data;
                        });
                });
        }

        function deleteForm(formId) {
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


}
})();