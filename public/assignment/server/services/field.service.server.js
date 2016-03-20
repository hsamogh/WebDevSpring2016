/**
 * Created by Amogh on 3/18/2016.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFormFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFldById);
    app.post("/api/assignment/form/:formId/field", cloneFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);

    function getAllFormFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var formFieldList = formModel.findAllFieldsById(formId);
        res.json(formFieldList);
    }

    function getFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formField = formModel.findFormFieldById(formId, fieldId);
        res.json(formField);
    }

    function deleteFormFldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var formFieldList = formModel.deleteFormFieldById(formId, fieldId);
        res.json(formFieldList);
    }

    function cloneFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newFormField = formModel.createFormField(formId, field);
        res.json(newFormField);
    }

    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        // use model to find user by id
        var formFields = formModel.updateFormField(formId, fieldId, field);
        res.json(formFields);
    }
};