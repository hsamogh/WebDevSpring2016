/**
 * Created by Amogh on 4/1/2016.
 */

module.exports = function (mongoose) {

    var fieldSchema = require('./field.schema.server.js')(mongoose);

    // Form Schema Declaration
    var formSchema = mongoose.Schema({
        title: String,
        userId: String,
        fields: [fieldSchema]
    }, {collection: 'form'});
    return formSchema;
};