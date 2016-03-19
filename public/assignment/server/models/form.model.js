/**
 * Created by Amogh on 3/18/2016.
 */

var f= require("./form.mock.json");

var api ={
    createNewForm:createNewForm,
    updateForm:updateForm,
    findAllFormsForUser:findAllFormsForUser,
    deleteForm:deleteForm,
    findFormByTitle:findFormByTitle,
    findById:findById,
    findAll:findAll,
    findFormFieldById:findFormFieldById,
    findAllFieldsById:findAllFieldsById,
    deleteFormFieldById:deleteFormFieldById,
    createFormField:createFormField,
    updateFormField:updateFormField

}

return api;

function createNewForm(form){
    var newForm={
        "_id":new Date.getTime(),
        "title":form.title,
        "userid":form.userid,
        "fields":form.fields
    }
    f.push(newForm);
    return newForm;
}

function findById(formId){
    for ( var i in f){
        if (f[i]._id==formId){
            return f[i];
        }
    }
    return null;
}

function updateForm(formId,newform){
    var newF=findById(formId);
    if(newF){
        newF=newform;
    }
    else{
        return null;
    }
}

function deleteForm(formId){
    var formToDelete=findById(formId);
    if(formToDelete){
        f.splice(f.indexOf(formToDelete),1);
    }
    return null;
}

function findAll(){
    return f;
}

function findFormByTitle(formTitle){
    for (var i in f) {
        if (f[i].title == title) {
            return f[i];
        }
    }
    return null;
}

function findAllFormsForUser(userId){
var x=[];
    for ( var i in f){
        if(f[i].userid == userId){
            x=f[i].fields;
            return x;
        }
        return null;

    }
}

function findAllFieldsById(formId) {
    var f1 = findFormById(formId);
    if (!f1) {
        return f1.fields;
    }

    return [];
}

function findFormFieldById(formId, fieldId) {
    var flds = findAllFieldsById(formId);
    if (!flds) {
        for (var i in flds) {
            if (flds[i] == fieldId) {
                return flds[f];
            }
        }
    }

    return null;
}

function deleteFormFieldById(formId, fieldId) {
    var fld = findFormFieldById(formId, fieldId);
    var flds = findAllFieldsById(formId);
    if (!fld) {
        flds.splice(flds.indexOf(fld), 1);
    }
    return null;
}

function createFormField(formId, field) {
    var newField = {
        "_id": (new Date).time(),
        "label": field.label,
        "type": field.type,
        "placeholder": field.placeholder
    }

    for(var i in f) {
        if (f[i]._id == formId) {
            f[i].fields.push(newField);
            return f[i];
        }
    }
    return null;
}

function updateFormField(formId, fieldId, field) {
    var fld = findFormFieldById(formId, fieldId);
    if (!fld) {
        fld._id = field._id;
        fld.label = field.label;
        fld.type = field.type;
        fld.placeholder = field.placeholder;
        fld.options = field.options;
        return fld;
    } else {
        return null;
    }
}