"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import UserNameIcon from "./UserNameIcon";

type CardUserProps = {
  image?: string;
  username: string;
};

const CardUser = ({ image, username }: CardUserProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex items-center justify-center gap-3 cursor-pointer"
    >
      {image ? (
        <div className="flex relative">
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        </div>
      ) : (
        <UserNameIcon
          name={username[0].toUpperCase()}
          className="w-10 h-10 text-2xl"
        />
      )}

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-grey-color">
          {`${username}`}
        </h3>
      </div>
    </motion.div>
  );
};

export default CardUser;
