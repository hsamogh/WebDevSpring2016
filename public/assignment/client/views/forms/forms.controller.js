
(function () {
    "use strict";
    angular
        .module("FormMakerApp")
        .controller("FormController", formController);

    function formController($location, FormService, UserService,$rootScope) {
        var formObject = this;
        var userId = $rootScope.user._id;


        function init() {
            if (UserService.getCurrentUser()) {
                console.log("Authenticated in form service");
                formObject.moveToFields = moveToFields;
                formObject.addForm = addForm;
                formObject.selectForm = selectForm;
                formObject.updateForm = updateForm;
                formObject.deleteForm = deleteForm;
                //console.log(UserService.getCurrentUser());
                //userId = UserService.getCurrentUser()._id;


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

        function moveToFields() {
            console.log("/fields/"+userId);
            $location.url("#/fields/"+userId);
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
                            formObject.myforms = response.data;
                        });
                });
        }

        function selectForm(form) {
            formObject.formName = form.title;
            formObject.newForm = form;
        }

        function addForm(fname) {
            if(fname==" " || fname==""){
                fname="default";
            }
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
                            formObject.myforms = response.data;
                        });
                });
        }




}
})();