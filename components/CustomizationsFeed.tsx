"use client";

import { ICustomizationDetails, IThreeDModelState } from "@/lib/types";
import { urlToBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import CardUser from "./CardUser";
import state from "@/store";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

const CustomizationsFeed = ({
  customizationDetails,
  isProfile = false,
}: {
  customizationDetails: ICustomizationDetails[];
  isProfile?: boolean;
}) => {
  return (
    <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
    <div className="flex flex-col justify-center items-center gap-y-2 min-h-[400px] md:min-h-[300px]">
      {!isProfile && (
        <Link href={`/profile/${customizationDetail.userId}`}>
          <CardUser
            image={customizationDetail.avatar}
            username={customizationDetail.username}
          />
        </Link>
      )}
      <Link
        className="flex h-full"
        href={`/customization/${customizationDetail.customizationId}`}
      >
        <Scene isCustomizable={false} threeDModelState={threeDModelState} />
      </Link>
    </div>
  );
};

export default CustomizationsFeed;
