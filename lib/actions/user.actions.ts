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

export const getUserDetails = async (userId: string) => {
  const userDetails = await sql`SELECT 
  id,
  first_name AS "firstName",
  last_name AS "lastName",
  avatar,
  bio 
  FROM users WHERE id = ${userId};`;

  return userDetails.rows;
};

export const followUser = async (followerId: string, followeeId: string) => {
  const followUserResult =
    await sql`INSERT INTO user_following (follower_id, followee_id)
  VALUES (${followerId}, ${followeeId});`;
};

export const unFollowUser = async (followerId: string, followeeId: string) => {
  const unFolloweUserResult = await sql`DELETE FROM user_following
  WHERE follower_id = ${followerId} AND followee_id = ${followeeId};`;
};

export const getFollowersList = async (userId: string) => {
  const getFollowersResult =
    await sql`SELECT * FROM user_following WHERE followee_id = ${userId};`;
};

export const getFollowingList = async (userId: string) => {
  const getFollowersResult =
    await sql`SELECT * FROM user_following WHERE followee_id = ${userId};`;
};
