/**
 * Created by Amogh on 3/18/2016.
 */

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllForms);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllForms(req, res) {
        formModel.findFormsForUser(req.params.userId)
            .then(
                function (doc) {
                   // console.log(doc);
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    //
    function getFormById(request, response) {
        var formId = request.params.formId;
        var form = formModel.findFormById(formId);
        response.json(form);
    }

    function createForm(req, res) {
        console.log("In create form");

        var userId = req.params.userId;
        console.log(userId);

        var form = req.body;
        console.log(form);
        var newForm = formModel.createForm(userId, form);
        res.json(newForm);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var updatedForm = formModel.updateForm(formId, form);
        res.json(updatedForm);
    }

    function deleteFormById(request, response) {
        var formId = request.params.formId;
        var updatedList = formModel.deleteForm(formId);
        response.json(updatedList);
    }
};