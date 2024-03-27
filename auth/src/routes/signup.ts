import express from "express";
import { signupValidation } from "../validations";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  signupValidation,
  asyncHandler((req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       res.status(400).send(errors.array());
    }

    console.log('Creating a user...')

    res.send({})
  })
);

export { router as signupRouter };
