"use client";

import CanvasModel from "@/components/canvas/CanvasModel";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { pacifico } from "./fonts";

export default function Home() {
  return (
    <motion.section
      className="w-full flex lg:flex-row flex-col xl:py-16 xl:px-24 sm:p-8 p-6 max-xl:gap-7"
      {...slideAnimation("left")}
    >
      <motion.div
        className="lg:w-2/5 w-full xl:py-16 flex flex-1 justify-center items-center"
        {...headContainerAnimation}
      >
        <div className="flex flex-col gap-10">
          <motion.div {...headTextAnimation}>
            <h1
              className="xl:text-[10rem] text-[4rem] xl:leading-[11rem] leading-[7rem] 
            font-black md:text-start text-center"
            >
              LET&apos;S
              <br className="hidden xl:block" /> DO IT.
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col xl:gap-12 gap-8 xl:justify-start justify-center"
          >
            <p className="max-w-md font-normal text-grey-color text-base xl:text-start text-center">
              Customize Your Style in 3D
              <br />
              <strong>Wear Innovation, Wear Exclusivity</strong>
            </p>
            <div className="w-full flex xl:justify-start justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -15, 0],
                  transition: { repeat: Infinity, duration: 1.5 },
                }}
              >
                <Link
                  href="/customize"
                  className={`${pacifico.className} text-primary font-extrabold text-3xl`}
                >
                  Create your style
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="lg:w-3/5 w-full flex flex-col justify-center items-center gap-6">
        <CanvasModel isCustomizable={true} />
        <Link
          href="/customizations"
          className={`${pacifico.className} text-primary font-extrabold text-3xl`}
        >
          Customizations
        </Link>
      </div>
    </motion.section>
  );
}
