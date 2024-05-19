import { createUser, updateUser } from "@/lib/actions/user.actions";
import { ClerkUser } from "@/lib/types";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000; // 1 second

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  // CREATE
  if (eventType === "user.created") {
    let userName = "";
    const { id, image_url, first_name, last_name, username } = evt.data;

    if (username) {
      userName = username;
    } else {
      userName = await fetchUserNameWithRetry(id);
    }

    const user: ClerkUser = {
      id,
      firstName: first_name || "",
      lastName: last_name || "",
      username: userName,
      avatar: image_url,
    };

    console.log(user);

    const newUser = await createUser(user);

    return NextResponse.json({ message: "OK", user: newUser });
  }

  //UPDATE
  if (eventType === "user.updated") {
    const userId = evt.data.id;
    const { id, firstName, lastName, username, imageUrl } =
      await clerkClient.users.getUser(userId);

    const user: ClerkUser = {
      id,
      firstName: firstName || "",
      lastName: lastName || "",
      username: username || "",
      avatar: imageUrl,
    };

    console.log(user);

    const updatedUser = await updateUser(user);

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  return new Response("", { status: 200 });
}

const fetchUserNameWithRetry = async (
  userId: string,
  retries = 0
): Promise<string> => {
  try {
    const { username } = await clerkClient.users.getUser(userId);

    if (username) {
      return username;
    } else {
      throw new Error("Username not available yet.");
    }
  } catch (error: any) {
    if (retries < MAX_RETRIES) {
      const delay = INITIAL_DELAY * Math.pow(2, retries);
      console.log(
        `Retry ${retries + 1}/${MAX_RETRIES}: Waiting ${delay}ms to retry...`
      );
      await new Promise((res) => setTimeout(res, delay));
      return fetchUserNameWithRetry(userId, retries + 1);
    } else {
      throw new Error(
        `Failed to fetch user details after ${MAX_RETRIES} retries: ${error.message}`
      );
    }
  }
};
