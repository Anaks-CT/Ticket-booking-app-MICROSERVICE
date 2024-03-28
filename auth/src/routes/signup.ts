import express, { Request, Response } from "express";
import { signupValidation } from "../validations";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import "express-async-errors";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  signupValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError('User already exists');

    const user = User.build({ email, password})
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
