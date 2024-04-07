import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";


import { errorHandler, NotFoundError } from "@anaks-ticketing-ms/common"

const app = express();
app.set("trust proxy", true); // trust the proxy that is coming from ingress enginx traffics
app.use(express.json());

app.use(
  cookieSession({
    // we dont want to encrypt the cockie because if we are using other backend architecture
    // using ruby rails its difficult with encryped cookies.
    // on top of that we are using tamper resistant JWT. so no worries.
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // only on https
  })
);


app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
