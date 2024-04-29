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
    INSERT INTO users (id, firstName, lastName, avatar, bio) VALUES 
    (${id}, ${firstName}, ${lastName}, ${avatar}, ${bio});
`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  console.log(`User Created`);
};
