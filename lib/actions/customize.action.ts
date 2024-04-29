"use server";

import { v2 as cloudinary } from "cloudinary";
import { ICustomization } from "../types";
import { isBase64 } from "../utils";
import { db, sql } from "@vercel/postgres";

export const createCustomization = async ({
  userId,
  logoImage,
  fullImage,
  isLogoImage,
  isFullImage,
  color,
}: ICustomization) => {
  const [logoImageUrl, fullImageUrl] = await uploadImages(logoImage, fullImage);

  try {
    await sql`
    INSERT INTO customizations (user_id, logo_image, full_image, is_logo_image, is_full_image, color) 
    VALUES (${userId}, ${logoImageUrl}, ${fullImageUrl}, ${isLogoImage}, ${isFullImage}, ${color})
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Customization.",
    };
  }
};

const uploadImages = async (
  logoImage: string,
  fullImage: string
): Promise<[string | null, string | null]> => {
  const folder = "shirtify";
  let logoImageUrl = null;
  let fullImageUrl = null;

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  if (isBase64(logoImage) && isBase64(fullImage)) {
    const [logoImageResponse, fullImageResponse] = await Promise.all([
      cloudinary.uploader.upload(logoImage, {
        folder: "shirtify",
      }),
      cloudinary.uploader.upload(fullImage, {
        folder: folder,
      }),
    ]);

    logoImageUrl = logoImageResponse.secure_url;
    fullImageUrl = fullImageResponse.secure_url;
  } else {
    if (isBase64(logoImage)) {
      const response = await cloudinary.uploader.upload(logoImage, {
        folder: folder,
      });

      logoImageUrl = response.secure_url;
    }

    if (isBase64(fullImage)) {
      const response = await cloudinary.uploader.upload(fullImage, {
        folder: folder,
      });

      fullImageUrl = response.secure_url;
    }
  }

  return [logoImageUrl, fullImageUrl];
};
