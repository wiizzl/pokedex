import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { hideAsync, preventAutoHideAsync, setOptions } from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

import { Icons } from "@/components/icons";
import { Text } from "@/components/text";

import { Colors } from "@/constants/colors";

preventAutoHideAsync();

setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: Colors.identity.primary },
          headerTitle: "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Icons.pokeball fill={Colors.grayscale.white} />
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>Pokédex</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="pokemon/[id]"
        options={{
          headerTransparent: true,
          presentation: "modal",
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
