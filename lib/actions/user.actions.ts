import { sql } from "@vercel/postgres";
import { User } from "../types";

export const createUser = async ({
  id,
  firstName,
  lastName,
  avatar,
  bio,
}: User) => {
  try {
    const createdUser = await sql`
    INSERT INTO users (id, first_name, last_name, avatar, bio) VALUES 
    (${id}, ${firstName}, ${lastName}, ${avatar}, ${bio});
`;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }
};
