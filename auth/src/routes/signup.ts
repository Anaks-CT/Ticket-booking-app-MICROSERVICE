import express, { Request, Response } from "express";
import { signupValidation } from "../validations";
import "express-async-errors";
import { User } from "../models/user";
import { validateRequest, BadRequestError, JwtManager } from "@anaks-ticketing-ms/common"

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
    const userjwt = JwtManager.signToken(user.id, user.email)

    // Store it on session
    req.session = {
      jwt: userjwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
