import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";

const app = express();
app.set("trust proxy", true); // trust the proxy that is coming from ingress enginx traffics
app.use(express.json());

app.use(
  cookieSession({
    // we dont want to encrypt the cockie because if we are using other backend architecture
    // using ruby rails its difficult with encryped cookies.
    // on top of that we are using tamper resistant JWT. so no worries.
    signed: false,
    secure: true, // only on https
  })
);

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => console.log("listening on port 3000"));
};

start();
