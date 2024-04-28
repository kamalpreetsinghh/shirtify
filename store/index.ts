import { proxy } from "valtio";

const state = proxy({
  color: "#C10048",
  isLogoImage: true,
  isFullImage: false,
  logoImage: "./assets/images/batman.png",
  fullImage: "./assets/images/batman.png",
});

export default state;
