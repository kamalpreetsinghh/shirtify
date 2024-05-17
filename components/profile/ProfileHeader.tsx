import { User } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import ProfileInfo from "./ProfileInfo";
import FollowButton from "./FollowButton";
import Connections from "./Connections";

type ProfileHeaderProps = {
  user: User;
};

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { userId: loggedInUserId } = auth();

  if (!loggedInUserId) return null;

  return (
    <div className="w-full max-w-[800px] flex-col px-8 lg:px-32 py-10">
      <div className="lg:inline-block">
        <ProfileInfo user={user} />
        {user.id === loggedInUserId ? (
          <Connections userId={loggedInUserId} />
        ) : (
          <FollowButton userId={loggedInUserId} followingId={user.id} />
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
