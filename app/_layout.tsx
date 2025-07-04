import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isRunningInExpoGo } from "expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { hideAsync, preventAutoHideAsync, setOptions } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { Icons } from "@/components/icons";
import { Text } from "@/components/text";

import { Colors } from "@/constants/colors";

preventAutoHideAsync();

if (!isRunningInExpoGo()) {
  setOptions({
    duration: 400,
    fade: true,
  });
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

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
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.identity.primary },
            headerTitle: () => (
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
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
