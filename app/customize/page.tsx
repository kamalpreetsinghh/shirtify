"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import state from "@/store";
import ColorPicker from "@/components/customize/ColorPicker";
import FilePicker from "@/components/customize/FilePicker";
import { slideAnimation } from "@/lib/motion";
import Tab from "@/components/customize/Tab";
import { EditorTabs, FilterTabs } from "@/lib/constants";
import { reader } from "@/lib/utils";
import CanvasModel from "@/components/canvas/CanvasModel";
import { ICustomization, IDecalType } from "@/lib/types";
import { createCustomization } from "@/lib/actions/customize.action";
import { ToastContainer } from "react-toastify";
import { SignedIn, UserProfile } from "@clerk/nextjs";
import { pacifico } from "../fonts";

const CustomizePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [isLogoActive, setIsLogoActive] = useState(state.isLogoImage);
  const [isFullActive, setIsFullActive] = useState(state.isFullImage);

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

  const handleSubmit = () => {};

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
      });
    }
  };

  const handleShare = async () => {
    const customization: ICustomization = {
      userId: UserProfile.name,
      logoImage: state.logoImage,
      fullImage: state.fullImage,
      color: state.color,
    };

    const result = await createCustomization(customization);
  };

  return (
    <>
      <div className="flex flex-1 w-[100vw] h-[80vh]">
        <CanvasModel className="flex flex-1 w-full h-full" />

        <SignedIn>
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
                    setActiveEditorTab(tab.name);
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
      <ToastContainer closeOnClick />
    </>
  );
};

export default CustomizePage;
