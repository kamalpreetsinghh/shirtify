import CustomizationsFeed from "@/components/CustomizationsFeed";
import { getCustomizations } from "@/lib/actions/customize.action";
import { ICustomizationDetails, ICustomizationDetailsDB } from "@/lib/types";

const CustomizationsPage = async () => {
  const customizationsDB = (await getCustomizations(
    1
  )) as ICustomizationDetailsDB[];
  console.log(customizationsDB);

  const customizationDetails: ICustomizationDetails[] = customizationsDB.map(
    (obj) => ({
      customizationId: obj.customization_id,
      logoImage: obj.logo_image,
      fullImage: obj.full_image,
      isLogoImage: obj.is_logo_image,
      isFullImage: obj.is_full_image,
      color: obj.color,
      userId: obj.user_id,
      firstName: obj.first_name,
      lastName: obj.last_name,
      avatar: obj.avatar,
    })
  );

  return <CustomizationsFeed customizationDetails={customizationDetails} />;
};

export default CustomizationsPage;
