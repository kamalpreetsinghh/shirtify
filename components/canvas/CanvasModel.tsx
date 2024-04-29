import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { Suspense } from "react";

const CanvasModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="transition-all ease-in background-color"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Suspense>
    </Canvas>
  );
};

export default CanvasModel;
