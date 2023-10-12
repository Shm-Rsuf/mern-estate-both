import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";
import AuthRouter from "./routes/auth.route.js";

dotenv.config();

const port = process.env.PORT || 8000;

/* app default middleware */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ success: false, message });
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Our app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error");
  });
