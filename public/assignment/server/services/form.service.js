/**
 * Created by Amogh on 3/18/2016.
 */

module.exports = function(app, formModel) {
    app.post("/api/assignment/user/:userId/form", getAllForms);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getAllForms(request, response) {
        var userId = request.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        response.json(forms);
    }

    function getFormById(request, response) {
        var formId = request.params.formId;
        var form = formModel.findFormById(formId);
        response.json(form);
    }

    function createForm(request, response) {
        var userId = requset.params.userId;
        var form = request.body;
        var newForm = userModel.createNewForm(userId, form);
        response.json(newForm);
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
}