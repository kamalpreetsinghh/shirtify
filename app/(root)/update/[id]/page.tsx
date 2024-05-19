import Customize from "@/components/Customize";
import { getCustomizationByID } from "@/lib/actions/customize.action";
import { ICustomizationDetails, IThreeDModelState } from "@/lib/types";

const UpdatePage = async ({ params: { id } }: { params: { id: string } }) => {
  const customizations = (await getCustomizationByID(
    id
  )) as ICustomizationDetails[];

  const { color, logoImage, fullImage, isLogoImage, isFullImage } =
    customizations[0];

  const threeDModelState: IThreeDModelState = {
    color,
    logoImage,
    fullImage,
    isLogoImage,
    isFullImage,
  };

  return (
    <Customize
      type="update"
      threeDModelState={threeDModelState}
      customizationId={id}
    />
  );
};

export default UpdatePage;
