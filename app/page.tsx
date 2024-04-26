"use client";

import CanvasModel from "@/components/canvas/CanvasModel";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <AnimatePresence>
      <motion.section
        className="w-full xl:h-full flex lg:flex-row flex-col
        xl:py-8 xl:px-28 sm:p-8 p-6 max-xl:gap-7"
        {...slideAnimation("left")}
      >
        <motion.div
          className="flex-1 xl:justify-center justify-start flex flex-col gap-10"
          {...headContainerAnimation}
        >
          <motion.div {...headTextAnimation}>
            <h1
              className="xl:text-[10rem] text-[4rem] xl:leading-[11rem] leading-[7rem] 
            font-black xl:text-start text-center"
            >
              LET'S
              <br className="hidden xl:block" /> DO IT.
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-5 xl:justify-start justify-center"
          >
            <p className="max-w-md font-normal text-grey-color text-base xl:text-start text-center">
              Customize Your Style in 3D
              <br />
              <strong>Wear Innovation, Wear Exclusivity</strong>
            </p>
            <div className="w-full flex xl:justify-start justify-center">
              <button className="rounded-button">Customize it</button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="flex flex-1">
          <CanvasModel />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
