import express, { Request, Response } from "express";
import { signinValidation } from "../validations";
import "express-async-errors";
import { validateRequest, BadRequestError, JwtManager } from "@anaks-ticketing-ms/common"
import { User } from "../models/user";
import { PasswordManager } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  signinValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // we provide less details to FE when dealing with authentication
    if (!existingUser) throw new BadRequestError("Invalid Credentials");

    const passwordMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) throw new BadRequestError("Invalid Credentials");

    // Generate token
    const userjwt = JwtManager.signToken(existingUser.id, existingUser.email)

    // Store it on session
    req.session = {
      jwt: userjwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
