"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Group } from "three";

interface GroupRef {
  current: Group | null;
}

const CameraRig = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const group: GroupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    // set the initial position of the model
    const targetPosition: [x: number, y: number, z: number] = [0, 0, 2];

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation
    if (group.current && group.current.rotation) {
      easing.dampE(
        group.current?.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
