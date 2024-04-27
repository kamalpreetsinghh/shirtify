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
        className="w-full flex lg:flex-row flex-col xl:py-16 xl:px-24 sm:p-8 p-6 max-xl:gap-7"
        {...slideAnimation("left")}
      >
        <motion.div
          className="lg:w-2/5 w-full xl:py-16 flex flex-1 justify-center items-center"
          {...headContainerAnimation}
        >
          <motion.div className="flex flex-col gap-10">
            <motion.div {...headTextAnimation}>
              <h1
                className="xl:text-[8rem] text-[4rem] xl:leading-[10rem] leading-[7rem] 
            font-black md:text-start text-center"
              >
                LET'S
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
                <button className="rounded-button">Customize it</button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="lg:w-3/5 w-full">
          <CanvasModel className="flex flex-1" />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
