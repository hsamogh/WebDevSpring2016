/**
 * Created by Amogh on 3/18/2016.
 */

var f = require("./form.mock.json");


module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findAllFormFieldsByFormId: findAllFormFieldsByFormId,
        findFormFieldById: findFormFieldById,
        deleteFormFieldById: deleteFormFieldById,
        createFormField: createFormField,
        updateFormFieldById: updateFormFieldById
    };
    return api;


    function findFormById(formId) {
        var response = null;
        for(var i in f) {
            if (f[i]._id == formId) {
                response = f[i];
                break;
            }
        }
        return response;
    }


    function createFormForUser(userId, form) {
        var new_form = {
            //"_id": (new Date).getTime(),
            "_id": (new Date).getTime(),
            "title": form.title,
            "userId": userId,
            "fields": form.fields
        };
        f.push(new_form);
        return new_form;
    }




    function deleteFormById(formId) {
        for(var i in f) {
            if (f[i]._id == formId) {
                f.splice(i, 1);
                return f;
            }
        }
    }

    function updateFormById(formId, newForm) {
        for(var i in mock) {
            if (f[i]._id == formId) {
                f[i] = newForm;
                return mock[i];
            }
        }
    }
    function createFormField(formId, field) {
        // Initialize the new field
        var newField = {
            "_id": (new Date).getTime(),
            "label": field.label,
            "type": field.type,
            "placeholder": field.placeholder,
            "options": field.options
        }

        // Push the field into form object
        for(var i in f) {
            if (f[i]._id == formId) {
                f[i].fields.push(newField);
                return f[i];
            }
        }
        return null;
    }
    function updateFormFieldById(formId, fieldId, field) {
        for(var i in f) {
            if (f[i]._id == formId) {
                for(var j in f[j].fields) {
                    if (f[i].fields[j]._id == fieldId) {
                        f[i].fields[j].label = field.label;
                        f[i].fields[j].type = field.type;
                        f[i].fields[j].placeholder = field.placeholder;
                        return f[i];
                    }
                }
                break;
            }
        }
        return null;
    }


    function findAllFormFieldsByFormId(formId) {
        for(var u in mock) {
            if(f[u]._id === formId) {
                return f[u].fields;
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var response = [];
        for(var i in f) {
            if (f[i].userId == userId) {
                response.push(f[i]);
            }
        }
        return response;
    }

    function findFormFieldById(formId, fieldId) {
        for(var u in f) {
            if(f[u]._id === formId) {
                for(var v in f[u].fields) {
                    if(f[u].fields[v]._id == fieldId) {
                        return f[u].fields[v];
                    }
                }
                break;
            }
        }
        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        for(var i in f) {
            if (f[i]._id == formId) {
                var updatedFields = [];
                for(var j in f[i].fields) {
                    if(f[i].fields[j]._id != fieldId) {
                        updatedFields.push(f[i].fields[j]);
                    }
                }
                f[i].fields = updatedFields
                return f[i];
            }
        }
        return null;
    }

    function createFormField(formId, field) {
        // Initialize the new field
        var newField = {
            "_id": (new Date).getTime(),
            "label": field.label,
            "type": field.type,
            "placeholder": field.placeholder,
            "options": field.options
        }

        // Push the field into form object
        for(var i in f) {
            if (f[i]._id == formId) {
                f[i].fields.push(newField);
                return f[i];
            }
        }
        return null;
    }


};