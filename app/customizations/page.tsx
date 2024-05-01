import CustomizationsFeed from "@/components/CustomizationsFeed";
import { getCustomizations } from "@/lib/actions/customize.action";
import { ICustomizationDetails } from "@/lib/types";

const CustomizationsPage = async () => {
  const customizations = (await getCustomizations(
    1
  )) as ICustomizationDetails[];

  return <CustomizationsFeed customizationDetails={customizations} />;
};

export default CustomizationsPage;
