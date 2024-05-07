import CustomizationsFeed from "@/components/CustomizationsFeed";
import Pagination from "@/components/pagination/Pagination";
import {
  getUserCustomizations,
  getUserCustomizationsPages,
} from "@/lib/actions/customize.action";
import { ICustomizationDetails } from "@/lib/types";

const ProfilePage = async ({
  params: { id, page },
}: {
  params: { id: string; page?: string };
}) => {
  const currentPage = (page && Number(page)) || 1;

  const customizations = (await getUserCustomizations(
    id,
    currentPage
  )) as ICustomizationDetails[];

  const totalPages = await getUserCustomizationsPages(id);

  return (
    <>
      <CustomizationsFeed
        customizationDetails={customizations}
        isProfile={true}
      />
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default ProfilePage;
