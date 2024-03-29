import express, { Request, Response } from "express";
import { signupValidation } from "../validations";
import "express-async-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  signupValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError("User already exists");

    const user = User.build({ email, password });
    await user.save();

    // Generate token
    const userjwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: 3600 }
    );

    // Store it on session
    req.session = {
      jwt: userjwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
