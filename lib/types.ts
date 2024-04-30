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
  isLogoImage: boolean;
  isFullImage: boolean;
  color: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio: string | null;
};

export type ICustomizationDetailsDB = {
  customization_id: string;
  logo_image: string;
  full_image: string;
  is_logo_image: boolean;
  is_full_image: boolean;
  color: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type ICustomizationDetails = {
  customizationId: string;
  logoImage: string;
  fullImage: string;
  isLogoImage: boolean;
  isFullImage: boolean;
  color: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type IThreeDModelState = {
  logoImage: string;
  fullImage: string;
  isLogoImage: boolean;
  isFullImage: boolean;
  color: string;
};
