import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { IThreeDModelState } from "@/lib/types";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

type CanvasModelProps = {
  isCustomizable?: boolean;
  threeDModelState?: IThreeDModelState | null;
  showTexture?: boolean;
};

const Scene = ({
  isCustomizable = false,
  threeDModelState = null,
  showTexture = false,
}: CanvasModelProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 22 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      className="transition-all ease-in background-color"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <spotLight
        position={[0, 0, 0]}
        angle={0.15}
        penumbra={1}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} intensity={Math.PI} />
      <Suspense fallback={null}>
        <CameraRig>
          <Backdrop />
          <Modal
            isCustomizable={isCustomizable}
            threeDModelState={threeDModelState}
            showTexture={showTexture}
          />
        </CameraRig>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
