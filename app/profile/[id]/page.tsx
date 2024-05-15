import CustomizationsFeed from "@/components/CustomizationsFeed";
import Pagination from "@/components/pagination/Pagination";
import ProfileInfo from "@/components/profile/ProfileInfo";
import {
  getUserCustomizations,
  getUserCustomizationsPages,
} from "@/lib/actions/customize.action";
import { getUserDetails } from "@/lib/actions/user.actions";
import { ICustomizationDetails, User } from "@/lib/types";

const ProfilePage = async ({
  params: { id, page },
}: {
  params: { id: string; page?: string };
}) => {
  const currentPage = (page && Number(page)) || 1;

  const userDetails = (await getUserDetails(id)) as User[];

  const customizations = (await getUserCustomizations(
    id,
    currentPage
  )) as ICustomizationDetails[];

  const totalPages = await getUserCustomizationsPages(id);

  return (
    <>
      <ProfileInfo
        userId={id}
        image={userDetails[0].avatar || ""}
        firstName={userDetails[0].firstName}
        lastName={userDetails[0].lastName}
        bio={customizations[0].bio}
      />
      <CustomizationsFeed
        customizationDetails={customizations}
        isProfile={true}
      />
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default ProfilePage;
