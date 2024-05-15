"use client";

import { fade, fadeRight } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import UserNameIcon from "../UserNameIcon";
import ProfileButtons from "./ProfileButtons";

type ProfileInfoProps = {
  userId: string;
  firstName: string;
  lastName: string;
  image?: string;
  bio?: string;
};

const ProfileInfo = ({
  userId,
  firstName,
  lastName,
  image,
  bio,
}: ProfileInfoProps) => {
  return (
    <div className="w-full flex justify-center lg:justify-start px-32 py-10">
      <motion.div className="flex flex-col" {...fadeRight}>
        {image ? (
          <Image
            src={image}
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
        <ProfileButtons userId={userId} />
      </motion.div>
    </div>
  );
};

export default ProfileInfo;
