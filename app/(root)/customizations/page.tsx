import CustomizationsFeed from "@/components/CustomizationsFeed";
import Pagination from "@/components/pagination/Pagination";
import {
  getCustomizationPages,
  getCustomizations,
} from "@/lib/actions/customize.action";
import { ICustomizationDetails } from "@/lib/types";

const CustomizationsPage = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const customizations = (await getCustomizations(
    currentPage
  )) as ICustomizationDetails[];

  const totalPages = await getCustomizationPages();

  return (
    <>
      <CustomizationsFeed customizationDetails={customizations} />
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default CustomizationsPage;
