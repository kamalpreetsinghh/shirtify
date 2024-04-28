import { db } from "@vercel/postgres";
import { User } from "../types";

export const createUser = async ({
  id,
  firstName,
  lastName,
  avatar,
  bio,
}: User) => {
  const client = await db.connect();
  const createdUser = await client.sql`
        INSERT INTO users (id, firstName, lastName, avatar, bio) VALUES 
        (${id}, ${firstName}, ${lastName}, ${avatar}, ${bio});
    `;

  console.log(`User Created`);
};
