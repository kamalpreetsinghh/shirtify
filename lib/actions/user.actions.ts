"use server";

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
    const result = await sql`
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
  const result = await sql`SELECT 
  id,
  first_name AS "firstName",
  last_name AS "lastName",
  avatar,
  bio 
  FROM users WHERE id = ${userId};`;

  return result.rows;
};

export const isFollowingUser = async (
  followerId: string,
  followeeId: string
) => {
  const result = await sql`
  SELECT EXISTS (
    SELECT 1
    FROM user_following
    WHERE follower_id = ${followerId} AND followee_id = ${followeeId}
);`;
  return result.rows[0];
};

export const followUser = async (followerId: string, followeeId: string) => {
  const result = await sql`INSERT INTO user_following (follower_id, followee_id)
  VALUES (${followerId}, ${followeeId});`;
};

export const unFollowUser = async (followerId: string, followeeId: string) => {
  const result = await sql`DELETE FROM user_following
  WHERE follower_id = ${followerId} AND followee_id = ${followeeId};`;
};

export const getFollowersList = async (userId: string) => {
  const result = await sql`SELECT 
    users.id AS "userId",
    users.first_name AS "firstName",
    users.last_name AS "lastName",
    users.avatar 
    FROM user_following 
    JOIN users ON user_following.follower_id = users.id
    WHERE user_following.followee_id = ${userId};`;

  return result.rows;
};

export const getFollowingList = async (userId: string) => {
  const result = await sql`SELECT
    users.id AS "userId",
    users.first_name AS "firstName",
    users.last_name AS "lastName",
    users.avatar 
    FROM user_following 
    JOIN users ON user_following.followee_id = users.id
    WHERE user_following.follower_id = ${userId};`;

  return result.rows;
};
