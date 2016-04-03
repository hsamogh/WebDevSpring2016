module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFormFieldsByFormId);
    app.get("/api/assignment/form/fieldTypes", getAllFieldTypes);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newform = formModel.createFormField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFieldTypes(req, res) {
        var fields = formModel.getAllFieldTypes()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFormFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fieldList = formModel.findAllFormFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldList = formModel.deleteFormFieldById(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function updateFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        // use model to find user by id
        var fields = formModel.updateFormFieldById(formId, fieldId, field)
            .then(
                function (doc) {

                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


};