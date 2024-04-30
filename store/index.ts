import { IThreeDModelState } from "@/lib/types";
import { proxy } from "valtio";

const state: IThreeDModelState = proxy({
  color: "#C10048",
  isLogoImage: true,
  isFullImage: false,
  logoImage: "./assets/images/batman.png",
  fullImage: "./assets/images/batman.png",
});

export default state;
