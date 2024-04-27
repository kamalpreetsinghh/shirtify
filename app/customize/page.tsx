"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import state from "@/store";
import ColorPicker from "@/components/customize/ColorPicker";
import FilePicker from "@/components/customize/FilePicker";
import { fadeAnimation, slideAnimation } from "@/lib/motion";
import Tab from "@/components/customize/Tab";
import { DecalTypes, EditorTabs, FilterTabs } from "@/lib/constants";
import Link from "next/link";
import { reader } from "@/lib/utils";
import CanvasModel from "@/components/canvas/CanvasModel";
import { IDecalType } from "@/lib/types";
import AIPicker from "@/components/customize/AIPicker";

const CustomizePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<any>({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {};

  const handleDecals = (type: IDecalType, result: any) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState: any) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type: IDecalType) => {
    if (file) {
      reader(file).then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      });
    }
  };

  return (
    <>
      <div className="flex flex-1 w-[100vw] h-[80vh]">
        <CanvasModel className="flex flex-1 w-full h-full" />
        <AnimatePresence>
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

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div></div>
    </>
  );
};

export default CustomizePage;
