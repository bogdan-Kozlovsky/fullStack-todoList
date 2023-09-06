import {body} from 'express-validator';

const registerValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}),
    body('fullName', 'FullName must be at least 3 characters long').isLength({min: 3}),
    body('avatarUrl', 'Wrong avatar link').optional().isURL(),
];

const loginValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}),
];

export {registerValidation, loginValidation};
