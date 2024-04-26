import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./assets/images/batman.png",
  fullDecal: "./assets/images/batman.png",
});

export default state;
