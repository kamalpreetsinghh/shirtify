import { IDecal, ITabInfo } from "./types";

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
    name: "logoShirt",
    icon: "/assets/images/logo-tshirt.png",
  },
  {
    name: "stylishShirt",
    icon: "/assets/images/stylish-tshirt.png",
  },
];

export const DecalTypes: IDecal = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
