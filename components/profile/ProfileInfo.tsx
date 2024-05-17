"use client";

import { fadeRight } from "@/lib/motion";
import { motion } from "framer-motion";
import { User } from "@/lib/types";
import Image from "next/image";
import UserNameIcon from "../UserNameIcon";

type ProfileInfoProps = {
  user: User;
};

const ProfileInfo = ({
  user: { id, firstName, lastName, avatar, bio },
}: ProfileInfoProps) => {
  return (
    <motion.div className="flex-col" {...fadeRight}>
      {avatar ? (
        <Image
          src={avatar}
          style={{ objectFit: "cover" }}
          className="rounded-full "
          alt="user image"
          height={100}
          width={100}
        />
      ) : (
        <span>
          <UserNameIcon name={firstName} className="w-28 h-28 text-7xl" />
        </span>
      )}
      <p className="text-4xl font-bold mt-4">
        {firstName} {lastName}
      </p>
      <p className="mt-5 text-lg sm:text-xl max-w-2xl;">
        {bio ? bio : "Elevating style to an art form, one outfit at a time."}
      </p>
    </motion.div>
  );
};

export default ProfileInfo;
