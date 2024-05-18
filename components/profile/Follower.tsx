"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserNameIcon from "../UserNameIcon";
import { FollowerUser, ModalType } from "@/lib/types";
import { followUser, unFollowUser } from "@/lib/actions/user.actions";

type FollowerProps = {
  modalType: ModalType;
  userId: string;
  follower: FollowerUser;
};

const Follower = ({
  modalType,
  userId,
  follower: { userId: id, firstName, lastName, avatar },
}: FollowerProps) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const handleOnClick = async () => {
    try {
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      if (modalType === ModalType.Following) {
        if (isFollowing) {
          await unFollowUser(userId, id);
        } else {
          await followUser(userId, id);
        }
      } else {
        if (isFollowing) {
          await unFollowUser(id, userId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full my-4 flex justify-between items-center">
      <Link href={`/profile/${id}`} className="flex gap-3 cursor-pointer">
        {avatar ? (
          <div className="w-12 h-12 relative">
            <Image
              src={avatar}
              fill={true}
              style={{ objectFit: "cover" }}
              alt="Profile Picture"
              className="rounded-full object-contain"
            />
          </div>
        ) : (
          <UserNameIcon
            name={firstName[0].toUpperCase()}
            className="w-12 h-12 text-2xl"
          />
        )}

        <div>
          <p className="font-bold">
            {firstName} {lastName}
          </p>
        </div>
      </Link>

      <button
        className="rounded-button bg-primary"
        disabled={modalType === ModalType.Followers && !isFollowing}
        onClick={handleOnClick}
      >
        {modalType === ModalType.Following
          ? isFollowing
            ? "Following"
            : "Follow"
          : isFollowing
          ? "Remove"
          : "Removed"}
      </button>
    </div>
  );
};

export default Follower;
