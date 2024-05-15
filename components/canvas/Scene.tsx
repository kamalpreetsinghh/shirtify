import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { IThreeDModelState } from "@/lib/types";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

type SceneProps = {
  isCustomizable?: boolean;
  threeDModelState?: IThreeDModelState | null;
  showTexture?: boolean;
};

const Scene = ({
  isCustomizable = false,
  threeDModelState = null,
  showTexture = false,
}: SceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 20 }}
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
        <group position={[0, 0.05, 0]}>
          <CameraRig>
            <Backdrop />
            <Modal
              isCustomizable={isCustomizable}
              threeDModelState={threeDModelState}
              showTexture={showTexture}
            />
          </CameraRig>
        </group>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
