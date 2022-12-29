import express, { Request, Response, NextFunction } from "express";

const profileImage = require("./router/user/setting/profileimage");

const app = express();

app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json(false);
  }
  next();
});

app.use("/api/v1/user/setting/profileimage", profileImage);
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json("test");
});

app.listen("4000", () => {
  console.log("listening");
});
