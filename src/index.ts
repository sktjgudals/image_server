import express, { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const profileImage = require("./router/user/setting/profileimage");
const token = require("./router/user/token");

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));

app.use("/api/v1/user/setting/profileimage", profileImage);
app.use("/api/v1/user/token", token);
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json("test");
});

app.listen("4000", () => {
  console.log("listening");
});
