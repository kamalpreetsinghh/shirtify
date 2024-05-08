import clsx from "clsx";
import Link from "next/link";

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) => {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border border-color rounded-full gap-2",
    {
      "z-10 bg-primary border-primary-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
};

export default PaginationNumber;
