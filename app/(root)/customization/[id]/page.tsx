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

  const { color, logoImage, fullImage, isLogoImage, isFullImage, userId } =
    customizations[0];

  const threeDModelState: IThreeDModelState = {
    color,
    logoImage,
    fullImage,
    isLogoImage,
    isFullImage,
  };

  return (
    <UserCustomization
      threeDModelState={threeDModelState}
      userId={userId}
      customizationId={id}
    />
  );
};

export default CustomizationPage;
