import express, { Request, Response, NextFunction } from "express";

import { uploadQuestionsImage } from "../../../util/aws/uploadImage";

const app = express.Router();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Post: questionsImage  , Time: ", Date.now());
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
      const path = await uploadQuestionsImage(base64data, userId + time, type);
      if (!path) return res.status(401);
      return res.status(200).json({ url: path });
    } catch (e) {
      if (e) return res.status(200).json({ url: null });
    }
  }
  return res.status(403);
});

module.exports = app;
