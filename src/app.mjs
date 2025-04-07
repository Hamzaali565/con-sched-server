import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localserver:3002",
      "http://localserver:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// my imports

import MainData from "../Routes/MainRoute/MainRoute.mjs";
import dailyReportRoutes from "../src/routes/dailyReport.routes.mjs";
// my routes

app.use("/api/v1", MainData);
app.use("/api/v1", dailyReportRoutes);

export { app };
