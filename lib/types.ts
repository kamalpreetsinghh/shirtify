export type IFilePicker = {
  file: File | null;
  setFile: any;
  readFile: (type: IDecalType) => void;
};

export type ITab = {
  tab: ITabInfo;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
};

export type ITabInfo = {
  name: string;
  icon: string;
};

export type IDecalType = "logo" | "full";

export type IDecal = {
  logo: IDecalInfo;
  full: IDecalInfo;
};

export type IDecalInfo = {
  stateProperty: string;
  filterTab: string;
};

export type IAIPicker = {
  prompt: string;
  setPrompt: (value: string) => void;
  generatingImg: any;
  handleSubmit: () => void;
};
