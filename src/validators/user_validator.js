const {
    body
} = require('express-validator');

module.exports.checklist = [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({min:5, max:20}),
    body("name").notEmpty(),
    body("last_name").notEmpty(),
    body("username").notEmpty(),
]