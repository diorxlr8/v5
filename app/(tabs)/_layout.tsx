import { MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    BackHandler,
    Easing,
    Pressable,
    Text,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const tabItems = [
  { label: "Home", href: "/", icon: "home", route: "index" },
  { label: "Feed", href: "/Feed", icon: "rss-feed", route: "Feed" },
  {
    label: "Workout",
    href: "/Workout",
    icon: "fitness-center",
    route: "Workout",
  },
  {
    label: "Camera",
    href: "/Camera",
    icon: "camera-alt",
    route: "Camera",
  },
  { label: "Settings", href: "/Settings", icon: "settings", route: "Settings" },
  {
    label: "You",
    href: "/Onboarding",
    icon: "person",
    route: "Onboarding",
  },
];

function SidebarItem({
  label,
  icon,
  active,
  onPress,
  theme,
}: {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
  theme: "light" | "dark";
}) {
  const itemBg = active
    ? theme === "light"
      ? "#e9f0fb"
      : "#2563eb"
    : theme === "light"
      ? "#edf4fc"
      : "#1e293b";
  const itemBorder = active
    ? theme === "light"
      ? "#c8d6e9"
      : "#3b82f6"
    : theme === "light"
      ? "#d3ddea"
      : "#334155";
  const iconColor = active
    ? theme === "light"
      ? "#102a43"
      : "#ffffff"
    : theme === "light"
      ? "#64748b"
      : "#cbd5e1";
  const textColor = active
    ? theme === "light"
      ? "#0f172a"
      : "#ffffff"
    : theme === "light"
      ? "#475569"
      : "#cbd5e1";

  return (
    <Pressable
      style={{ backgroundColor: itemBg, borderColor: itemBorder }}
      className="mb-2 flex-row items-center rounded-3xl border px-4 py-3"
      onPress={onPress}
    >
      <MaterialIcons name={icon as any} size={22} color={iconColor} />
      <Text style={{ color: textColor }} className="ml-4 text-base font-medium">
        {label}
      </Text>
    </Pressable>
  );
}

export default function RootLayout() {
  const router = useRouter();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const segments = useSegments();
  const currentRoute = segments[0] || "index";

  useEffect(() => {
    const onBackPress = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );
    return () => subscription.remove();
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    }
  }, [sidebarOpen, slideAnim]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        {!sidebarOpen && (
          <View className="absolute left-5 top-5 z-30">
            <Pressable
              onPress={() => setSidebarOpen(true)}
              className="rounded-full bg-[#0f172a] p-3 shadow-lg shadow-slate-900/40"
            >
              <MaterialIcons name="menu" size={22} color="#93c5fd" />
            </Pressable>
          </View>
        )}

        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme === "light" ? "#102a43" : "#f1f5f9",
            tabBarInactiveTintColor: theme === "light" ? "#64748b" : "#94a3b8",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
            },
            tabBarStyle: {
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 56,
              elevation: 12,
              backgroundColor: theme === "light" ? "#e9f0fb" : "#1e293b",
              borderRadius: 32,
              height: 72,
              borderTopWidth: 0,
              borderWidth: 1,
              borderColor: theme === "light" ? "#c8d6e9" : "#334155",
              shadowColor: theme === "light" ? "#102a43" : "#020617",
              shadowOpacity: 0.12,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 10 },
            },
            tabBarIcon: ({ color, size, focused }) => {
              const iconName =
                route.name === "index"
                  ? "home"
                  : route.name === "Feed"
                    ? "rss-feed"
                    : route.name === "Workout"
                      ? "fitness-center"
                      : route.name === "Camera"
                        ? "camera-alt"
                        : route.name === "Settings"
                          ? "settings"
                          : route.name === "Onboarding"
                            ? "person"
                            : "circle";

              const tabColor = focused
                ? route.name === "index"
                  ? "#f97316"
                  : route.name === "Feed"
                    ? "#2563eb"
                    : route.name === "Workout"
                      ? "#16a34a"
                      : route.name === "Camera"
                        ? "#10b981"
                        : route.name === "Settings"
                          ? "#f59e0b"
                          : route.name === "Onboarding"
                            ? "#ef4444"
                            : color
                : color;

              return (
                <MaterialIcons
                  name={iconName as any}
                  size={size}
                  color={tabColor}
                />
              );
            },
          })}
        >
          <Tabs.Screen name="index" options={{ title: "Home" }} />
          <Tabs.Screen name="Feed" />
          <Tabs.Screen name="Workout" />
          <Tabs.Screen name="Camera" options={{ title: "Scan" }} />
          <Tabs.Screen name="Settings" />
          <Tabs.Screen name="Onboarding" options={{ title: "You" }} />
        </Tabs>
      </View>

      {sidebarVisible && (
        <>
          <Pressable
            className="absolute inset-0 z-10 bg-black/30"
            onPress={() => setSidebarOpen(false)}
          />
          <Animated.View
            style={{
              transform: [{ translateX: slideAnim }],
              backgroundColor: theme === "light" ? "#e9f0fb" : "#1e293b",
              borderColor: theme === "light" ? "#c8d6e9" : "#334155",
            }}
            className="absolute left-0 top-0 bottom-0 z-20 w-72 border-r px-4 py-5 shadow-2xl shadow-slate-900/10"
          >
            <View className="mb-4 flex-row items-center justify-end">
              <Pressable
                onPress={() => setSidebarOpen(false)}
                style={{
                  backgroundColor: theme === "light" ? "#151833" : "#0f172a",
                }}
                className="rounded-full p-2"
              >
                <MaterialIcons name="chevron-left" size={20} color="#8c92b3" />
              </Pressable>
            </View>

            {tabItems.map((item) => (
              <SidebarItem
                key={item.route}
                label={item.label}
                icon={item.icon}
                active={currentRoute === item.route}
                theme={theme}
                onPress={() => {
                  router.push(item.href as any);
                  setSidebarOpen(false);
                }}
              />
            ))}
            <View
              style={{
                borderTopColor: theme === "light" ? "#c8d6e9" : "#334155",
              }}
              className="mt-4 pt-4 border-t"
            >
              <Pressable
                onPress={() => {
                  setSidebarOpen(false);
                  router.replace("/(auth)/Login");
                }}
                style={{
                  backgroundColor: theme === "light" ? "#ffffff" : "#0f172a",
                  borderColor: theme === "light" ? "#c8d6e9" : "#334155",
                }}
                className="mt-2 flex-row items-center rounded-3xl border px-4 py-3"
              >
                <MaterialIcons name="logout" size={22} color="#ef4444" />
                <Text className="ml-4 text-base font-medium text-[#ef4444]">
                  Logout
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}
