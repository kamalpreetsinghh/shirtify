"use client";

import { ITab } from "@/lib/types";
import state from "@/store";
import Image from "next/image";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";

const Tab = ({
  tab,
  isFilterTab = false,
  isActiveTab = false,
  handleClick,
}: ITab) => {
  const snap = useSnapshot(state);

  console.log(tab);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <Image
        src={tab.icon}
        alt={tab.name}
        width={40}
        height={40}
        style={{ objectFit: "cover" }}
      />
    </motion.div>
  );
};

export default Tab;
