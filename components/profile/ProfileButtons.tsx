"use client";

import { useAuth } from "@clerk/nextjs";
import ProfileActions from "./ProfileActions";
import Link from "next/link";

const ProfileButtons = ({ userId }: { userId: string }) => {
  const { userId: loggedInUserId, isSignedIn } = useAuth();

  if (!isSignedIn) return null;

  return (
    <>
      {userId === loggedInUserId ? (
        <div className="flex gap-2 w-full">
          <button onClick={() => {}} className="rounded-button bg-primary mt-4">
            Followers
          </button>
          <button onClick={() => {}} className="rounded-button bg-primary mt-4">
            Following
          </button>
        </div>
      ) : (
        <ProfileActions userId={userId} followingId={loggedInUserId} />
      )}
    </>
  );
};

export default ProfileButtons;
