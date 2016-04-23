/**
 * Created by Amogh on 3/18/2016.
 */
var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);
    var FieldModel = mongoose.model('field', FieldSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser

    };

    return api;

    //**************************************************
    // Function to create form
    //**************************************************

    function createForm(userId,form){

        //console.log("Server Model ");

        var deferred = q.defer();

        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        //console.log(deferred.promise);
        return deferred.promise;
    }

    //**************************************************
    // Function to update form
    //**************************************************


    function updateForm(id, form) {
        var deferred = q.defer();
        FormModel.findOneAndUpdate(
            {_id : id}, {$set: form},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }

    //**************************************************
    // Function to delete form
    //**************************************************

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel.remove({_id : id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    //**************************************************
    // Function to find All forms
    //**************************************************

    function findAllForms(){
        var deferred = q.defer();
        FormModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    //**************************************************
    // Function to find all forms for a user
    //**************************************************

    function findFormsForUser(userId){
        var deferred = q.defer();
        //console.log("In Form Model checking for user forms");
        //console.log(userId);
        var k;
       FormModel.find({ userId : userId},
            function (err, doc) {
                if (err) {
                    console.log("Failing in service model form");
                    deferred.reject(err);
                } else {
                    console.log("It has passed user model");
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    //**************************************************
    // Function to find forms by userid
    //**************************************************

    function findFormByID(id){
        var deferred = q.defer();
        FormModel.findById(id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    //**************************************************
    // Function to find forms by title
    //**************************************************


    function findFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne({title : title},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }
};


