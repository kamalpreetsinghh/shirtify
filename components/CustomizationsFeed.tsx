"use client";

import { ICustomizationDetails, IThreeDModelState } from "@/lib/types";
import CardUser from "./customize/CardUser";
import CanvasModel from "./canvas/CanvasModel";
import state from "@/store";
import { isBase64, urlToBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";

const CustomizationsFeed = ({
  customizationDetails,
}: {
  customizationDetails: ICustomizationDetails[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {customizationDetails.map((customization) => (
        <CustomizationCard
          key={customization.customizationId}
          customizationDetail={customization}
        />
      ))}
    </div>
  );
};

const CustomizationCard = ({
  customizationDetail,
}: {
  customizationDetail: ICustomizationDetails;
}) => {
  const [logoImage, setLogoImage] = useState(state.logoImage);
  useEffect(() => {
    const loadImage = async () => {
      if (customizationDetail.logoImage) {
        const imageResponse = await urlToBase64(customizationDetail.logoImage);
        setLogoImage(imageResponse);
        console.log(imageResponse);
      }
    };

    loadImage();
  }, []);

  const threeDModelState: IThreeDModelState = {
    color: customizationDetail.color,
    isLogoImage: customizationDetail.isLogoImage,
    isFullImage: customizationDetail.isFullImage,
    logoImage: logoImage,
    fullImage: state.fullImage,
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <CardUser
        firstName={customizationDetail.firstName}
        lastName={customizationDetail.lastName}
      />
      <CanvasModel isCustomizable={false} threeDModelState={threeDModelState} />
    </div>
  );
};

export default CustomizationsFeed;
