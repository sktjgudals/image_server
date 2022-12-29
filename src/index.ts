import express, { Request, Response, NextFunction } from "express";
const cors = require("cors");
const profileImage = require("./router/user/setting/profileimage");

const app = express();
app.use(cors());
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));

app.use("/api/v1/user/setting/profileimage", profileImage);
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json("test");
});

app.listen("4000", () => {
  console.log("listening");
});
