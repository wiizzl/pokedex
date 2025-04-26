import { ExpoConfig } from "expo/config";

import pckJson from "./package.json";

/**
 * @see https://docs.expo.dev/versions/latest/config/app/
 */
export default (): ExpoConfig => ({
  name: "Pokédex",
  description: pckJson.description,
  slug: pckJson.name,
  version: pckJson.version,
  platforms: ["android", "ios"],
  githubUrl: "https://github.com/wiizzl/pokedex",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  backgroundColor: "#DC0A2D",
  primaryColor: "#DC0A2D",
  icon: "./src/assets/images/app/icon.png",
  scheme: pckJson.name,
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    versionCode: parseInt(pckJson.version.replaceAll(".", "") + "0"),
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/app/adaptive-icon.png",
      backgroundColor: "#DC0A2D",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/app/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#DC0A2D",
      },
    ],
    [
      "expo-font",
      {
        fonts: ["./src/assets/fonts/SpaceMono-Regular.ttf"],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
