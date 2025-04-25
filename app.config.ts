import { ExpoConfig } from "expo/config";

import pckJson from "./package.json";

export default (): ExpoConfig => ({
  name: "Pokédex",
  slug: pckJson.name,
  version: pckJson.version,
  orientation: "portrait",
  icon: "./src/assets/images/app/icon.png",
  scheme: pckJson.name,
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/app/adaptive-icon.png",
      backgroundColor: "#ffffff",
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
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
