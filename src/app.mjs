import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cons-sched.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// my imports

import MainData from "../Routes/MainRoute/MainRoute.mjs";

// my routes

app.use("/api/v1", MainData);

export { app };
