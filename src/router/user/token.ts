import express, { Request, Response, NextFunction } from "express";
const mysql = require("mysql");
const jwt = require("../../../util/jwt/token");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

const app = express.Router();

type User = {
  userId: Number;
  displayName: String;
  profileImage: String;
};

const cookieExtractor = async (req: Request) => {
  const { Authorization } = req.cookies;
  const res = await jwt.verify(Authorization);
  return res;
};

const setUserToken = async (res: Response, user: User) => {
  const token = await jwt.sign(user);
  res
    .status(201)
    .cookie("Authorization", token.token, {
      maxAge: 24 * 60 * 60 * 4000,
      httpOnly: true,
      path: "/",
    })
    .send();
};

const dbSearch = async () => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `SELECT * FROM users WHERE user_id=1`,
        (error: any, rows: any, fields: any) => {
          if (error) throw error;
          resolve(rows);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

app.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      userId: 5,
      displayName: "test",
      profileImage:
        "https://stackoverflows3.s3.ap-northeast-2.amazonaws.com/1672364664612.png",
    };
    const data = await dbSearch();
    console.log(data);
    // const result = await cookieExtractor(req);
    // console.log(result);
    // const token = await setUserToken(res, payload);

    res.status(200).send();
  }
);

module.exports = app;
