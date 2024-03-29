import express, { Request, Response } from "express";
import { signinValidation } from "../validations";
import "express-async-errors";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  signinValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    res.send("hi there !!");
  }
);

export { router as signinRouter };
