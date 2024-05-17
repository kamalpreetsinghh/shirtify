import { FollowerUser, ModalType } from "@/lib/types";
import Follower from "./Follower";

type FollowerListProps = {
  modalType: ModalType;
  userId: string;
  followers: FollowerUser[];
};

const Followers = ({ modalType, userId, followers }: FollowerListProps) => {
  return (
    <>
      {followers.map((follower) => (
        <Follower
          key={follower.userId}
          modalType={modalType}
          userId={userId}
          follower={follower}
        />
      ))}
    </>
  );
};

export default Followers;
