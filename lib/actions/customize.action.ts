"use server";

import { v2 as cloudinary } from "cloudinary";
import { ICustomization } from "../types";
import { isBase64 } from "../utils";
import { db } from "@vercel/postgres";

export const createCustomization = async ({
  userId,
  logoImage,
  fullImage,
  color,
}: ICustomization) => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  let logoImageUrl = null;
  let fullImageUrl = null;

  if (isBase64(logoImage) && isBase64(fullImage)) {
    const [logoImageResponse, fullImageResponse] = await Promise.all([
      cloudinary.uploader.upload(logoImage, {
        folder: "shirtify",
      }),
      cloudinary.uploader.upload(fullImage, {
        folder: "shirtify",
      }),
    ]);

    logoImageUrl = logoImageResponse.secure_url;
    fullImageUrl = fullImageResponse.secure_url;
  } else {
    if (isBase64(logoImage)) {
      const response = await cloudinary.uploader.upload(logoImage, {
        folder: "shirtify",
      });

      logoImageUrl = response.secure_url;
    }

    if (isBase64(fullImage)) {
      const response = await cloudinary.uploader.upload(fullImage, {
        folder: "shirtify",
      });

      fullImageUrl = response.secure_url;
    }
  }

  console.log(logoImageUrl);
  console.log(fullImageUrl);
};
