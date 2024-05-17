"use client";

import { useAuth } from "@clerk/nextjs";

const Connections = ({ userId }: { userId: string }) => {
  const { userId: loggedInUserId, isSignedIn } = useAuth();

  if (!isSignedIn) return null;

  return (
    <div className="flex gap-2 w-full">
      <button onClick={() => {}} className="rounded-button-primary-color mt-4">
        Followers
      </button>
      <button onClick={() => {}} className="rounded-button-primary-color mt-4">
        Following
      </button>
    </div>
  );
};

export default Connections;
