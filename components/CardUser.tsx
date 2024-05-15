"use client";

import Image from "next/image";
import UserNameIcon from "./customize/UserNameIcon";
import { motion } from "framer-motion";

type CardUserProps = {
  image?: string;
  firstName: string;
  lastName: string;
};

const CardUser = ({ image, firstName, lastName }: CardUserProps) => {
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
          name={firstName[0].toUpperCase()}
          className="w-10 h-10 text-2xl"
        />
      )}

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-grey-color">
          {`${firstName} ${lastName}`}
        </h3>
      </div>
    </motion.div>
  );
};

export default CardUser;
