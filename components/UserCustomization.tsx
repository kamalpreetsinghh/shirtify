"use client";

import { IThreeDModelState } from "@/lib/types";
import { useEffect, useState } from "react";
import CanvasModel from "./canvas/CanvasModel";
import { urlToBase64 } from "@/lib/utils";
import state from "@/store";
import { Loader } from "@react-three/drei";

const UserCustomization = ({
  threeDModelState,
}: {
  threeDModelState: IThreeDModelState;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const threeDModelState2 = {
    ...threeDModelState,
    logoImage: state.logoImage,
    fullImage: state.fullImage,
  };

  useEffect(() => {
    const loadImagesFromUrl = async () => {
      if (threeDModelState.logoImage && threeDModelState.fullImage) {
        const [logoImageResponse, fullImageResponse] = await Promise.all([
          urlToBase64(threeDModelState.logoImage),
          urlToBase64(threeDModelState.fullImage),
        ]);

        threeDModelState2.logoImage = logoImageResponse;
        threeDModelState2.fullImage = fullImageResponse;
      } else if (threeDModelState.logoImage) {
        const logoImageResponse = await urlToBase64(threeDModelState.logoImage);

        threeDModelState2.logoImage = logoImageResponse;
        threeDModelState2.fullImage = logoImageResponse;
      } else if (threeDModelState.fullImage) {
        const fullImageResponse = await urlToBase64(threeDModelState.fullImage);

        threeDModelState2.logoImage = fullImageResponse;
        threeDModelState2.fullImage = fullImageResponse;
      }
    };

    setIsLoading(true);
    loadImagesFromUrl();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1 w-[100vh] h-[80vh] justify-center items-center">
      <CanvasModel
        isCustomizable={false}
        threeDModelState={threeDModelState2}
      />
    </div>
  );
};

export default UserCustomization;
