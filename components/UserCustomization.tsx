"use client";

import { IThreeDModelState } from "@/lib/types";
import { useEffect, useState } from "react";
import { urlToBase64 } from "@/lib/utils";
import { Loader } from "@react-three/drei";
import { useAuth } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/ui/dialog";
import { deleteCustomization } from "@/lib/actions/customize.action";
import { useRouter } from "next/navigation";
import state from "@/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import { DefaultState } from "@/lib/constants";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

type UserCustomizationProps = {
  threeDModelState: IThreeDModelState;
  userId: string;
  customizationId: string;
};

const UserCustomization = ({
  threeDModelState,
  userId,
  customizationId,
}: UserCustomizationProps) => {
  const { isSignedIn, userId: loggedInUserId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const threeDModelStateWithBase64Images = {
    ...threeDModelState,
    logoImage: state.logoImage,
    fullImage: state.fullImage,
  };

  const router = useRouter();

  const resetState = () => {
    const { color, isLogoImage, isFullImage, logoImage, fullImage } =
      DefaultState;
    state.color = color;
    state.isLogoImage = isLogoImage;
    state.isFullImage = isFullImage;
    state.logoImage = logoImage;
    state.fullImage = fullImage;
  };

  useEffect(() => {
    const loadImagesFromUrl = async () => {
      const [logoImageResponse, fullImageResponse] = await Promise.all([
        urlToBase64(threeDModelState.logoImage),
        urlToBase64(threeDModelState.fullImage),
      ]);

      threeDModelStateWithBase64Images.logoImage = logoImageResponse;
      threeDModelStateWithBase64Images.fullImage = fullImageResponse;
    };

    setIsLoading(true);
    loadImagesFromUrl();
    setIsLoading(false);
  }, []);

  const handleDelete = async () => {
    setIsSubmitting(true);
    await deleteCustomization(
      customizationId,
      threeDModelState.logoImage,
      threeDModelState.fullImage
    );
    setIsSubmitting(false);
    resetState();
    router.replace("/customizations");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[100vw] h-[82vh]">
      <Scene
        isCustomizable={false}
        threeDModelState={threeDModelStateWithBase64Images}
        showTexture={true}
      />
      {isSignedIn && userId === loggedInUserId && (
        <div className="w-full flex justify-center gap-4">
          <Link
            className="rounded-button bg-primary"
            href={`/update/${customizationId}`}
          >
            Update
          </Link>
          <Dialog>
            <DialogTrigger className="rounded-button bg-red-700">
              Delete
            </DialogTrigger>
            <DialogContent className="w-[90vw] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your design and remove your data
                  from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex justify-center md:justify-end gap-2">
                <button
                  className="w-[90px] rounded-button bg-red-700"
                  onClick={handleDelete}
                >
                  {isSubmitting ? (
                    <div className="h-5 flex items-center justify-center">
                      <span className="horizontal-spinner bottom-3"></span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
                <DialogClose asChild>
                  <button className="w-[90px] rounded-button bg-primary">
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default UserCustomization;
