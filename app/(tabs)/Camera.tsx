import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    Alert,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CameraPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const bgColor = theme === "light" ? "#ffffff" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";

  return (
    <SafeAreaView style={{ backgroundColor: bgColor }} className="flex-1">
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text style={{ color: textColor }} className="text-2xl font-semibold">
            Food Scan
          </Text>
          <Text style={{ color: textColor }} className="text-sm mt-1">
            Camera placeholder for future Google Vision integration
          </Text>
        </View>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-slate-200 p-3"
        >
          <MaterialIcons name="close" size={22} color={textColor} />
        </Pressable>
      </View>

      {!permission ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text style={{ color: textColor }} className="text-base text-center">
            Requesting camera permission...
          </Text>
        </View>
      ) : permission.granted ? (
        <View className="flex-1 px-6 py-4">
          <View
            style={{ backgroundColor: cardBg }}
            className="flex-1 overflow-hidden rounded-3xl border border-slate-300"
          >
            {/*
              TODO:
              - Replace this placeholder view with a live Camera preview using the expo-camera component.
              - Capture an image and upload it to Google Vision / Cloud Vision API.
              - Extract food labels, ingredients, and approximate calories from the Vision response.
            */}
            <View className="flex-1 items-center justify-center">
              <Text
                style={{ color: textColor }}
                className="text-base font-semibold text-center px-4"
              >
                Camera access is enabled. Add the live preview here.
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-sm text-center mt-3 px-4"
              >
                This page is ready for the next step: capture food images, send
                them to Vision, and display calorie estimates.
              </Text>
            </View>
          </View>

          <View className="mt-4 rounded-3xl border border-slate-300 bg-slate-100 p-4">
            <Text style={{ color: textColor }} className="font-semibold mb-2">
              Next integration steps
            </Text>
            <Text style={{ color: textColor }} className="text-sm leading-6">
              1. Use Camera.takePictureAsync() to capture the food image.
              {"\n"}2. Send the image data to Google Cloud Vision / Nutrition
              API.
              {"\n"}3. Parse the returned food labels and estimate calories.
              {"\n"}4. Store the results in app state or log them in the user
              profile.
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text
            style={{ color: textColor }}
            className="text-base text-center mb-4"
          >
            Camera permission is required to use this feature.
          </Text>
          <Pressable
            onPress={() => {
              if (permission.canAskAgain) {
                requestPermission();
              } else {
                Alert.alert(
                  "Permission needed",
                  Platform.select({
                    ios: "Open settings and enable camera access.",
                    android: "Open app settings and enable camera access.",
                  }) || "Enable camera access in settings.",
                );
              }
            }}
            className="rounded-3xl bg-[#2563eb] px-6 py-3"
          >
            <Text className="text-white font-semibold">Enable Camera</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
