import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@microserviceticket/common";
import { createChargeRouter } from "./routes/new";

const app = express();
/*tells express that it's behind a proxy of ingress engine x,
 and to make sure that it should still trust traffic as being secure,
 event though it's coming from that proxy.*/
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
