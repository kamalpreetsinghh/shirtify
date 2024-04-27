import { proxy } from "valtio";

const state = proxy({
  color: "#F50056",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./assets/images/batman.png",
  fullDecal: "./assets/images/batman.png",
});

export default state;
