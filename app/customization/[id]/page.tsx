import UserCustomization from "@/components/UserCustomization";
import { getCustomizationByID } from "@/lib/actions/customize.action";
import { ICustomizationDetails, IThreeDModelState } from "@/lib/types";

const CustomizationPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const customizations = (await getCustomizationByID(
    id
  )) as ICustomizationDetails[];

  const customizationDetail = customizations[0];

  const threeDModelState: IThreeDModelState = {
    color: customizationDetail.color,
    logoImage: customizationDetail.logoImage,
    fullImage: customizationDetail.fullImage,
    isLogoImage: customizationDetail.isLogoImage,
    isFullImage: customizationDetail.isFullImage,
  };

  return <UserCustomization threeDModelState={threeDModelState} />;
};

export default CustomizationPage;
