"use client";

import { ICustomizationDetails, IThreeDModelState } from "@/lib/types";
import CardUser from "./customize/CardUser";
import CanvasModel from "./canvas/CanvasModel";
import state from "@/store";
import { urlToBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

const CustomizationsFeed = ({
  customizationDetails,
  isProfile = false,
}: {
  customizationDetails: ICustomizationDetails[];
  isProfile?: boolean;
}) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
      {customizationDetails.map((customization) => (
        <CustomizationCard
          key={customization.customizationId}
          customizationDetail={customization}
          isProfile={isProfile}
        />
      ))}
    </div>
  );
};

const CustomizationCard = ({
  customizationDetail,
  isProfile = false,
}: {
  customizationDetail: ICustomizationDetails;
  isProfile?: boolean;
}) => {
  const [logoImage, setLogoImage] = useState(state.logoImage);
  const [fullImage, setFullImage] = useState(state.fullImage);

  useEffect(() => {
    const loadImagesFromUrl = async () => {
      if (customizationDetail.logoImage && customizationDetail.fullImage) {
        const [logoImageResponse, fullImageResponse] = await Promise.all([
          urlToBase64(customizationDetail.logoImage),
          urlToBase64(customizationDetail.fullImage),
        ]);

        setLogoImage(logoImageResponse);
        setFullImage(fullImageResponse);
      } else if (customizationDetail.logoImage) {
        const logoImageResponse = await urlToBase64(
          customizationDetail.logoImage
        );

        setLogoImage(logoImageResponse);
        setFullImage(logoImageResponse);
      } else if (customizationDetail.fullImage) {
        const fullImageResponse = await urlToBase64(
          customizationDetail.fullImage
        );

        setLogoImage(fullImageResponse);
        setFullImage(fullImageResponse);
      }
    };

    loadImagesFromUrl();
  }, []);

  const threeDModelState: IThreeDModelState = {
    color: customizationDetail.color,
    isLogoImage: customizationDetail.isLogoImage,
    isFullImage: customizationDetail.isFullImage,
    logoImage: logoImage,
    fullImage: fullImage,
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {!isProfile && (
        <CardUser
          firstName={customizationDetail.firstName}
          lastName={customizationDetail.lastName}
        />
      )}
      <Link href={`/customization/${customizationDetail.customizationId}`}>
        <CanvasModel
          isCustomizable={false}
          threeDModelState={threeDModelState}
        />
      </Link>
    </div>
  );
};

export default CustomizationsFeed;
