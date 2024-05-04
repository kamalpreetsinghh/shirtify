import Image from "next/image";
import UserNameIcon from "./customize/UserNameIcon";

type CardUserProps = {
  image?: string;
  firstName: string;
  lastName: string;
};

const CardUser = ({ image, firstName, lastName }: CardUserProps) => {
  return (
    <div className="flex items-center justify-center gap-3 cursor-pointer">
      {image ? (
        <div className="flex w-10 h-10 relative"></div>
      ) : (
        <UserNameIcon
          name={firstName[0].toUpperCase()}
          className="w-10 h-10 text-2xl"
        />
      )}

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-grey-color">
          {`${firstName} ${lastName}`}
        </h3>
      </div>
    </div>
  );
};

export default CardUser;
