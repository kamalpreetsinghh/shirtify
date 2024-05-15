"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { slideAnimation } from "@/lib/motion";
import { EditorTabs, FilterTabs } from "@/lib/constants";
import { isBase64, reader } from "@/lib/utils";
import { ICustomization, IDecalType } from "@/lib/types";
import { createCustomization } from "@/lib/actions/customize.action";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { pacifico } from "../fonts";
import { Toaster, toast } from "sonner";
import Tab from "@/components/customize/Tab";
import state from "@/store";
import ColorPicker from "@/components/customize/ColorPicker";
import FilePicker from "@/components/customize/FilePicker";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

const CustomizePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [isLogoActive, setIsLogoActive] = useState(state.isLogoImage);
  const [isFullActive, setIsFullActive] = useState(state.isFullImage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const { userId, isSignedIn } = useAuth();

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type: IDecalType, result: string) => {
    state[type] = result as string;

    if (type === "logoImage" && !state.isLogoImage) {
      state.isLogoImage = true;
    } else if (type === "fullImage" && !state.isFullImage) {
      state.isFullImage = true;
    }
  };

  const handleActiveFilterTab = (tabName: IDecalType) => {
    if (tabName === "logoImage") {
      state.isLogoImage = !state.isLogoImage;
      setIsLogoActive(!isLogoActive);
    } else if (tabName === "fullImage") {
      state.isFullImage = !state.isFullImage;
      setIsFullActive(!isFullActive);
    }
  };

  const readFile = (type: IDecalType) => {
    if (file) {
      reader(file).then((result) => {
        handleDecals(type, result as string);
        setActiveEditorTab("");
        setIsShared(false);
      });
    }
  };

  const handleShare = async () => {
    if (isSignedIn) {
      if (isBase64(state.logoImage) || isBase64(state.fullImage)) {
        const customization: ICustomization = {
          userId: userId,
          logoImage: state.logoImage,
          fullImage: state.fullImage,
          isLogoImage: state.isLogoImage,
          isFullImage: state.isFullImage,
          color: state.color,
        };

        setIsSubmitting(true);

        try {
          const result = await createCustomization(customization);
          setIsShared(true);
          toast("Your design is shared with the community.");
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        toast("Please select an image for your design.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-1 w-[100vw] h-[82vh]">
        <Scene isCustomizable={true} showTexture={true} />

        <SignedIn>
          {!isSubmitting ? (
            <>
              {!isShared && (
                <motion.div
                  className="absolute top-0 right-0 z-0 mt-24 mr-24 h-[85vh] flex items-center"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -15, 0],
                    transition: { repeat: Infinity, duration: 1.5 },
                  }}
                >
                  <button
                    className={`${pacifico.className} text-primary font-extrabold text-3xl`}
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="absolute top-0 right-0 z-0 mt-24 mr-24 h-[80vh] flex items-center">
              <div className="half-circle-spinner">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
              </div>
            </div>
          )}

          {isShared && <></>}
        </SignedIn>

        <motion.div
          key="custom"
          className="absolute top-0 left-0 z-10"
          {...slideAnimation("left")}
        >
          <div className="flex items-center min-h-screen">
            <div className="editortabs-container">
              {EditorTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={() => {
                    if (activeEditorTab === tab.name) {
                      setActiveEditorTab("");
                    } else {
                      setActiveEditorTab(tab.name);
                    }
                  }}
                />
              ))}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={
                tab.name === "logoImage" ? isLogoActive : isFullActive
              }
              handleClick={() => handleActiveFilterTab(tab.name as IDecalType)}
            />
          ))}
        </motion.div>
      </div>
      <Toaster />
    </>
  );
};

export default CustomizePage;
