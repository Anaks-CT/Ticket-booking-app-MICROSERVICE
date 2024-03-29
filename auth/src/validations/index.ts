import { body } from "express-validator";

export const signupValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 - 20 characters"),
];

export const signinValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
