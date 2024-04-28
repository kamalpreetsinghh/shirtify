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

export type IDecalType = "logoImage" | "fullImage";

export type IAIPicker = {
  prompt: string;
  setPrompt: (value: string) => void;
  generatingImg: any;
  handleSubmit: () => void;
};

export type ICustomization = {
  userId: string;
  logoImage: string;
  fullImage: string;
  color: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio: string | null;
};
