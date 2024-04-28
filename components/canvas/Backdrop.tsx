"use client";

import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useTheme } from "next-themes";

const Backdrop = () => {
  const { theme } = useTheme();

  const lightIntensity = theme === "dark" ? 0.55 : 3.0;
  const shadows = useRef(null);

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal={false}
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={lightIntensity}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={lightIntensity}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
