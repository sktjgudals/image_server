import express, { Request, Response, NextFunction } from "express";
import { uploadProfileImage } from "../../../../util/aws/uploadProfileImage";

const app = express.Router();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Post: profileImage  , Time: ", Date.now());
  next();
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const { image, userId } = req.body;
    try {
      const time = Date.now();
      const type = image.split(";")[0].split("/")[1];
      const base64data = Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const path = await uploadProfileImage(base64data, userId + time, type);
      if (path === false) return res.status(401);
      return res.status(200).json({ url: path });
    } catch (e) {
      if (e) return res.status(200).json({ url: null });
    }
  }
  return res.status(403);
});

module.exports = app;
