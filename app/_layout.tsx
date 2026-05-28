import "@/global.css";
import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";
import { WorkoutProvider } from "./context/WorkoutContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <WorkoutProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </WorkoutProvider>
    </ThemeProvider>
  );
}

/**import "@/global.css";
import { Stack } from "expo-router";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}>
     <Tabs>
      <Tabs.Screen name="index"/>
      <Tabs.Screen name="Feed"/>
      <Tabs.Screen name="More"/>
      <Tabs.Screen name="Settings"/>
    </Tabs>
  </Stack>;
}
 */
