/**
 * Created by Amogh on 4/1/2016.
 */


module.exports = function (mongoose) {

    // Declaring field schema

    var fieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'field'});
    return fieldSchema;
};