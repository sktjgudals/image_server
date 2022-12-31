import express, { Request, Response, NextFunction } from "express";
const mysql = require("mysql");
const jwt = require("../../../util/jwt/token");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express.Router();

type User = {
  userId: Number;
  displayName: String;
  profileImage: String;
  roles: String[];
  email: String;
};

const cookieExtractor = async (req: Request) => {
  const { Authorization } = req.cookies;
  return await jwt.verify(Authorization);
};

const setUserToken = async (res: Response, user: User) => {
  const { token } = await jwt.sign(user);
  res
    .status(201)
    .cookie("Authorization", token, {
      maxAge: 24 * 60 * 60 * 4000,
      httpOnly: true,
      path: "/",
    })
    .send();
};

const dbSearch = async (userid: number) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `SELECT * FROM users  WHERE userid=${userid}`,
        (error: any, rows: any, fields: any) => {
          if (error) throw error;
          resolve(rows);
        }
      );
    } catch (e) {
      resolve(false);
    }
  });
};

app.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await cookieExtractor(req);
    if (result) {
      const data: any = await dbSearch(result.userId);
      if (data.length > 0) {
        const payload = {
          displayName: data[0].display_name,
          roles: ["USER"],
          profileImage: data[0].profile_image,
          userId: data[0].userid,
          email: data[0].email,
        };
        await setUserToken(res, payload);
      }
    }

    res.status(200).send();
  }
);

module.exports = app;
