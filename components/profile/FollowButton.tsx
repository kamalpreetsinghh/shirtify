"use client";

import {
  followUser,
  isFollowingUser,
  unFollowUser,
} from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

type ProfileActionsProps = {
  userId: string;
  followingId: string;
};

const FollowButton = ({ userId, followingId }: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await isFollowingUser(userId, followingId);
      setIsFollowing(response.exists);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handleOnClick = async () => {
    try {
      setIsSubmitting(true);
      if (isFollowing) {
        const response = await unFollowUser(userId, followingId);
      } else {
        const response = await followUser(userId, followingId);
      }
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="rounded-button-primary-color mt-4 w-full"
    >
      {isSubmitting ? (
        <div className="h-6 flex items-center justify-center">
          <span className="horizontal-spinner bottom-3"></span>
        </div>
      ) : (
        <>{isFollowing ? "Following" : "Follow"}</>
      )}
    </button>
  );
};

export default FollowButton;
