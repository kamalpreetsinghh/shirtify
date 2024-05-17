"use client";

import { getFollowersList, getFollowingList } from "@/lib/actions/user.actions";
import { FollowerUser, ModalType } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Followers from "./Followers";

const Connections = ({ userId }: { userId: string }) => {
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [modalType, setModalType] = useState(ModalType.Followers);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchConnections = async () => {
      const [followersResponse, followingResponse] = await Promise.all([
        getFollowersList(userId),
        getFollowingList(userId),
      ]);

      setFollowers(followersResponse as FollowerUser[]);
      setFollowing(followingResponse as FollowerUser[]);

      console.log(followersResponse);
      console.log(followingResponse);
    };

    fetchConnections();
  }, []);

  const showFollowersModal = () => {
    setModalType(ModalType.Followers);
    showModal();
  };

  const showFollowingModal = () => {
    setModalType(ModalType.Following);
    showModal();
  };

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  if (dialogRef.current) {
    dialogRef.current.addEventListener("click", (e) => {
      if (dialogRef.current) {
        const dialogDimensions = dialogRef.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current.close();
        }
      }
    });
  }

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={showFollowersModal}
        className="rounded-button-primary-color mt-4"
      >
        Followers
      </button>
      <button
        onClick={showFollowingModal}
        className="rounded-button-primary-color mt-4"
      >
        Following
      </button>
      <dialog className="rounded-2xl w-full max-w-md p-4" ref={dialogRef}>
        <div className="flex-col items-center justify-center">
          <div className="flex w-full">
            <h1 className="mb-2 font-bold flex items-center justify-center">
              {ModalType[modalType]}
            </h1>
            <IoClose className="right-0" />
          </div>

          <div
            className="border-t divider-color w-full 
              h-96 overflow-y-scroll overflow-x-scroll"
          >
            {modalType === ModalType.Following && following.length === 0 && (
              <h1 className="my-4 flex items-center justify-center">
                No Following
              </h1>
            )}
            {modalType === ModalType.Followers && followers.length === 0 && (
              <h1 className="my-4 flex items-center justify-center">
                No Followers
              </h1>
            )}
            <Followers
              modalType={modalType}
              userId={userId}
              followers={
                modalType === ModalType.Following ? following : followers
              }
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Connections;
