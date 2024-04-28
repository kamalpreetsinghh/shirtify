import { ITabInfo } from "./types";

export const EditorTabs: ITabInfo[] = [
  {
    name: "colorpicker",
    icon: "/assets/images/color.png",
  },
  {
    name: "filepicker",
    icon: "/assets/images/file.png",
  },
  {
    name: "aipicker",
    icon: "/assets/images/ai.png",
  },
];

export const FilterTabs: ITabInfo[] = [
  {
    name: "logoImage",
    icon: "/assets/images/logo-tshirt.png",
  },
  {
    name: "fullImage",
    icon: "/assets/images/stylish-tshirt.png",
  },
];

export const DecalTypes = ["logoImage", "fullImage"];
