"use server";

import { v2 as cloudinary } from "cloudinary";
import { ICustomization, UpdateCustomization } from "../types";
import { isBase64 } from "../utils";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 6;

export const getCustomizations = async (pageNumber: number) => {
  noStore();
  const offset = (pageNumber - 1) * ITEMS_PER_PAGE;
  // use double quotes to preserve the case sensitivity of columns and cast them directly with ts variables
  try {
    const customizations = await sql`
    SELECT customizations.id AS "customizationId",          
    customizations.logo_image AS "logoImage",
    customizations.full_image AS "fullImage",
    customizations.is_logo_image AS "isLogoImage",
    customizations.is_full_image AS "isFullImage",
    customizations.color,
    users.id AS "userId",
    users.first_name AS "firstName",
    users.last_name AS "lastName",
    users.avatar
    FROM customizations  
    JOIN users ON customizations.user_id = users.id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    return customizations.rows;
  } catch (error) {
    return {
      message: "Database Error: Failed to Retrieve Customizations.",
    };
  }
};

export const createCustomization = async ({
  id,
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
    VALUES (${id}, ${logoImageUrl}, ${fullImageUrl}, ${isLogoImage}, ${isFullImage}, ${color})
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Customization.",
    };
  }
};

export const updateCustomization = async ({
  customization: { id, logoImage, fullImage, isLogoImage, isFullImage, color },
  previousFullImageUrl,
  previousLogoImageUrl,
}: UpdateCustomization) => {
  console.log(previousFullImageUrl);
  console.log(previousLogoImageUrl);
  await deleteImages(previousFullImageUrl, previousLogoImageUrl);
  const [logoImageUrl, fullImageUrl] = await uploadImages(logoImage, fullImage);

  try {
    await sql`
    UPDATE customizations
    SET logo_image = ${logoImageUrl},
    full_image = ${fullImageUrl},
    is_logo_image = ${isLogoImage},
    is_full_image = ${isFullImage}, 
    color = ${color}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Customization.",
    };
  }
};

export const getUserCustomizations = async (
  userId: string,
  pageNumber: number
) => {
  noStore();
  const offset = (pageNumber - 1) * ITEMS_PER_PAGE;
  try {
    const customizations = await sql`
    SELECT customizations.id AS "customizationId",          
    customizations.logo_image AS "logoImage",
    customizations.full_image AS "fullImage",
    customizations.is_logo_image AS "isLogoImage",
    customizations.is_full_image AS "isFullImage",
    customizations.color,
    users.id AS "userId",
    users.first_name AS "firstName",
    users.last_name AS "lastName",
    users.avatar,
    users.bio
    FROM customizations  
    JOIN users ON customizations.user_id = users.id
    WHERE customizations.user_id = ${userId}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    return customizations.rows;
  } catch (error) {
    return {
      message: "Database Error: Failed to Retrieve User Customizations.",
    };
  }
};

export const getCustomizationByID = async (customizationID: string) => {
  noStore();

  try {
    const customizations = await sql`
    SELECT customizations.id AS "customizationId",          
    customizations.logo_image AS "logoImage",
    customizations.full_image AS "fullImage",
    customizations.is_logo_image AS "isLogoImage",
    customizations.is_full_image AS "isFullImage",
    customizations.color,
    users.id AS "userId",
    users.first_name AS "firstName",
    users.last_name AS "lastName",
    users.avatar,
    users.bio
    FROM customizations  
    JOIN users ON customizations.user_id = users.id
    WHERE customizations.id = ${customizationID}
  `;

    return customizations.rows;
  } catch (error) {
    return {
      message: "Database Error: Failed to Retrieve Customization By ID.",
    };
  }
};

export const getCustomizationPages = async () => {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customizations
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of customizations.");
  }
};

export const getUserCustomizationsPages = async (userId: string) => {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customizations
    WHERE customizations.user_id = ${userId}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of user customizations.");
  }
};

export const deleteCustomization = async (
  id: string,
  logoImageUrl: string | null,
  fullImageUrl: string | null
) => {
  try {
    await deleteImages(logoImageUrl, fullImageUrl);

    await sql`
    DELETE FROM customizations
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Customization.",
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

const deleteImages = async (
  logoImageUrl: string | null,
  fullImageUrl: string | null
) => {
  const folder = "shirtify/";

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  if (logoImageUrl && fullImageUrl) {
    const logoImagePublicId = folder + getPublicId(logoImageUrl);
    const fullImagePublicId = folder + getPublicId(fullImageUrl);

    await Promise.all([
      cloudinary.uploader.destroy(logoImagePublicId),
      cloudinary.uploader.destroy(fullImagePublicId),
    ]);
  } else {
    if (logoImageUrl) {
      const logoImagePublicId = folder + getPublicId(logoImageUrl);
      await cloudinary.uploader.destroy(logoImagePublicId);
    }

    if (fullImageUrl) {
      const fullImagePublicId = folder + getPublicId(fullImageUrl);
      await cloudinary.uploader.destroy(fullImagePublicId);
    }
  }
};

const getPublicId = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
};
