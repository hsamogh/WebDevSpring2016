(function () {
    "use strict";
    angular
        .module("FormMakerApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, UserService, FieldService, $location) {
        var fieldObject = this;
        var formId = $routeParams.formId;

        function init() {
            console.log("Welcome to field Controller");
            if (UserService.getCurrentUser()) {
                var currUser = UserService.getCurrentUser();
                fieldObject.userId = currUser._id;
                fieldObject.username = currUser.username;
                fieldObject.password = currUser.password;
                fieldObject.firstName = currUser.firstName;
                fieldObject.lastName = currUser.lastName;
                fieldObject.Email = currUser.email;

                fieldObject.editField = editField;
                fieldObject.clear = clear;
                fieldObject.addField = addField;
                fieldObject.deleteField = deleteField;
            } else {
                $location.path("#/home");
            }

            if(formId) {
                FieldService
                    .getFieldsForForm(formId)
                    .then(function(response){
                        console.log(response);
                        fieldObject.fields = response.data;
                    });
            }
        }
        init();

        function editField(field) {
            clear();
            fieldObject.currEditField = field;
            fieldObject.currEditFieldLabel = field.label;
            if (!field.options) {
                fieldObject.currEditFieldPlaceholder = field.placeholder;
            }
            if (field.options) {
                var txt = "";
                for (var i in field.options) {
                    txt += (field.options[i].label + ":" + field.options[i].value + "\n");
                }
                fieldObject.currEditFieldOptions = txt;
                console.log(txt);
            }
        }

        function clear() {
            fieldObject.currEditField = null;
            fieldObject.currEditFieldLabel = null;
            fieldObject.currEditFieldPlaceholder = null;
            fieldObject.currEditFieldOptions = null;
        }

        function addField(fieldType) {
            console.log("You are in new Field");
            var newField = {}
            if (fieldType == "TEXT") {
                newField._id = null;
                newField.label = "New-Text-Field";
                newField.type = "TEXT";
                newField.placeholder = "text-field";
            } else if (fieldType == "TEXTAREA") {
                newField._id = null;
                newField.label = "New-Text-Field";
                newField.type = "TEXTAREA";
                newField.placeholder = "text-area";
            } else if (fieldType == "DATE") {
                newField._id = null;
                newField.label = "date-field";
                newField.type = "DATE";
            } else if (fieldType == "CHECKBOXES") {
                newField._id = null;
                newField.label = "New-Checkboxes";
                newField.type = "CHECKBOXES";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            } else if (fieldType == "RADIOS") {
                newField._id = null;
                newField.label = "Radio-Buttons";
                newField.type = "RADIOS";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }

            FieldService
                .createFieldForm(formId, newField)
                .then(function(response){
                    console.log(response.data);
                    fieldObject.feilds = response.data.fields;
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldForm(formId, field._id)
                .then(function (response) {
                    console.log(response.data);
                    fieldObject.fields = response.data.fields;
                });
        }
    }
})();