import { User } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import ProfileInfo from "./ProfileInfo";
import FollowButton from "./FollowButton";
import Connections from "./Connections";
import Link from "next/link";

type ProfileHeaderProps = {
  user: User;
};

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { userId: loggedInUserId } = auth();

  return (
    <div className="w-full max-w-[800px] flex-col px-8 md:px-32 py-10">
      <div className="lg:inline-block">
        <ProfileInfo user={user} canEdit={user.id === loggedInUserId} />
        {loggedInUserId ? (
          <>
            {user.id === loggedInUserId ? (
              <Connections userId={loggedInUserId} />
            ) : (
              <FollowButton userId={loggedInUserId} followingId={user.id} />
            )}
          </>
        ) : (
          <Link
            className="rounded-button bg-primary mt-4 flex w-full justify-center"
            href="/sign-in"
          >
            Follow
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
