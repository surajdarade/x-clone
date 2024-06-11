import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3Config = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_KEY!,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET!,
  },
});

const generateKey = (prefix: string, file: any) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const key = `${prefix}/${file.fieldname}_${uniqueSuffix}${path.extname(file.originalname)}`;
  console.log(`Generated S3 Key: ${key}`);
  return key;
};

const avatarS3Config = {
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME!,
  acl: "public-read",
  metadata: function (req: any, file: any, cb: any) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req: any, file: any, cb: any) {
    cb(null, generateKey("profiles", file));
  },
};

const postS3Config = {
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME!,
  acl: "public-read",
  metadata: function (req: any, file: any, cb: any) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req: any, file: any, cb: any) {
    cb(null, generateKey("posts", file));
  },
};

export const uploadAvatar = multer({
  storage: multerS3(avatarS3Config),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

export const uploadPost = multer({
  storage: multerS3(postS3Config),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

export const deleteFile = async (fileuri: string) => {
  const fileKey = fileuri.split("/").slice(-2).join("/");
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Delete: { Objects: [{ Key: fileKey }] },
  };
  const command = new DeleteObjectsCommand(params);
  return await s3Config.send(command);
};
