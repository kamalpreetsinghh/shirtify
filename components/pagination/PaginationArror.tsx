import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) => {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <Image
        src={"/assets/images/left-icon.png"}
        alt="logo"
        width={20}
        height={20}
      />
    ) : (
      <Image
        src={"/assets/images/right-icon.png"}
        alt="logo"
        width={20}
        height={20}
      />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
};

export default PaginationArrow;
