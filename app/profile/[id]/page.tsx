import CustomizationsFeed from "@/components/CustomizationsFeed";
import { getUserCustomizations } from "@/lib/actions/customize.action";
import { ICustomizationDetails } from "@/lib/types";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const customizations = (await getUserCustomizations(
    id,
    1
  )) as ICustomizationDetails[];

  return (
    <CustomizationsFeed
      customizationDetails={customizations}
      isProfile={true}
    />
  );
};

export default ProfilePage;
