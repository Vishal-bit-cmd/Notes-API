const Joi = require('joi');

function validateNote(note) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        content: Joi.string().min(5).required()
    });
    return schema.validate(note);
}

function validateNotePatch(note) {
    const schema = Joi.object({
        name: Joi.string().min(3),
        content: Joi.string().min(5)
    }).min(1);
    return schema.validate(note);
}

module.exports = {
    validateNote,
    validateNotePatch
};