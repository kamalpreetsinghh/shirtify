"use client";

import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "@/store";
import { Color } from "three";
import { IThreeDModelState } from "@/lib/types";

type ShirtProps = {
  isCustomizable: boolean;
  threeDModelState: IThreeDModelState | null;
};

const Shirt = ({
  isCustomizable = false,
  threeDModelState = null,
}: ShirtProps) => {
  const appState = useSnapshot(state);

  const snap =
    !isCustomizable && threeDModelState ? threeDModelState : appState;
  const { nodes, materials } = useGLTF("/assets/threedmodels/shirt_baked.glb");
  const object3dEventMap = nodes.T_Shirt_male as any;

  const logoImage = useTexture(snap.logoImage);
  const fullImage = useTexture(snap.fullImage);

  useFrame((state, delta) => {
    const lambertMaterial = materials.lambert1 as any;
    easing.dampC(lambertMaterial.color as Color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        geometry={object3dEventMap.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullImage && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullImage}
          />
        )}

        {snap.isLogoImage && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.18}
            map={logoImage}
            depthTest={false}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
