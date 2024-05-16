"use client";

import { IThreeDModelState } from "@/lib/types";
import { useEffect, useState } from "react";
import { resetState, urlToBase64 } from "@/lib/utils";
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

  const threeDModelState2 = {
    ...threeDModelState,
    logoImage: state.logoImage,
    fullImage: state.fullImage,
  };

  const router = useRouter();

  useEffect(() => {
    const loadImagesFromUrl = async () => {
      if (threeDModelState.logoImage && threeDModelState.fullImage) {
        const [logoImageResponse, fullImageResponse] = await Promise.all([
          urlToBase64(threeDModelState.logoImage),
          urlToBase64(threeDModelState.fullImage),
        ]);

        threeDModelState2.logoImage = logoImageResponse;
        threeDModelState2.fullImage = fullImageResponse;
      } else if (threeDModelState.logoImage) {
        const logoImageResponse = await urlToBase64(threeDModelState.logoImage);

        threeDModelState2.logoImage = logoImageResponse;
        threeDModelState2.fullImage = logoImageResponse;
      } else if (threeDModelState.fullImage) {
        const fullImageResponse = await urlToBase64(threeDModelState.fullImage);

        threeDModelState2.logoImage = fullImageResponse;
        threeDModelState2.fullImage = fullImageResponse;
      }
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
        threeDModelState={threeDModelState2}
        showTexture={true}
      />
      {isSignedIn && userId === loggedInUserId && (
        <div className="w-full flex justify-center gap-4">
          <Link
            className="rounded-button-primary-color"
            href={`/update/${customizationId}`}
          >
            Update
          </Link>
          <Dialog>
            <DialogTrigger className="rounded-button bg-red-700">
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your design and remove your data
                  from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex justify-end gap-4">
                <button
                  className="w-[90px] rounded-button bg-red-700"
                  onClick={handleDelete}
                >
                  {isSubmitting ? (
                    <div className="h-6 flex items-center justify-center">
                      <span className="horizontal-spinner bottom-3"></span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
                <DialogClose asChild>
                  <button className="w-[90px] rounded-button-primary-color">
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
