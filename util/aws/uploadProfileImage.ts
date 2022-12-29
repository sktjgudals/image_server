import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
const dotenv = require("dotenv");
dotenv.config();

const s3Client = new S3({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }),
});

export const uploadProfileImage = async (
  base64: any,
  dirname: string,
  type: string
) => {
  return await new Promise<any>(async (resolve, reject) => {
    const params = {
      Bucket: `stackoverflows3`,
      Key: `${dirname}.${type}`,
      Body: base64,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    try {
      const { Location } = await s3Client.upload(params).promise();
      return resolve(`${Location}`);
    } catch (e) {
      if (e) {
        return resolve(false);
      }
    }
  });
};

export const deletetS3ProfileImage = async (id: string) => {
  return await new Promise(async (resolve, reject) => {
    const deleteParams = {
      Bucket: `${process.env.AWS_PROFILEBUCKET}`,
      // Key: user.image.split(`${process.env.AWS_PROFILE}`)[1],
      Key: "",
    };
    await s3Client.deleteObject(deleteParams).promise();
    return resolve(true);
  });
};
