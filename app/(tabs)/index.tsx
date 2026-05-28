import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const user = {
  name: "Alex",
  todayCalories: 340,
  goalCalories: 2200,
  workoutsThisWeek: 4,
  streak: 12,
};

const upcomingWorkouts = [
  { name: "Upper Strength", time: "Tomorrow, 7:00 AM", icon: "💪" },
  { name: "HIIT Sprint", time: "Wednesday, 6:00 PM", icon: "🏃" },
];

const recentActivity = [
  { name: "Yoga Flow", date: "Today", duration: "30 min", accent: "#2563eb" },
  {
    name: "Full Body Blast",
    date: "Yesterday",
    duration: "45 min",
    accent: "#ef4444",
  },
];

const tipsOfTheDay = [
  "Drink water before meals to support digestion.",
  "Add extra greens to one meal today.",
  "Choose lean protein for sustained energy.",
  "Swap a snack for fresh fruit.",
  "Keep your posture tall while working.",
  "Try a quick 2-minute stretch break.",
  "Add color to your plate for nutrients.",
  "Track one meal to learn portion sizes.",
  "Enjoy your food slowly and mindfully.",
  "Use the camera scan page to log meals fast.",
];

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");

  const bgColor = theme === "light" ? "#ffffff" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const secondaryText = theme === "light" ? "#64748b" : "#cbd5e1";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";
  const borderColor = theme === "light" ? "#e2e8f0" : "#334155";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const caloriesPercent = Math.min(
    100,
    (user.todayCalories / user.goalCalories) * 100,
  );

  const filteredUpcoming = upcomingWorkouts.filter((w) =>
    w.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 pt-16">
      <View
        style={{ borderBottomColor: borderColor }}
        className="border-b px-6 py-5"
      >
        <Text style={{ color: textColor }} className="text-2xl font-semibold">
          {getGreeting()}, {user.name}
        </Text>
        <Text style={{ color: secondaryText }} className="text-sm mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-3">
        <View
          style={{ backgroundColor: cardBg, borderColor }}
          className="rounded-3xl border px-4 py-4 mb-4"
        >
          <Text
            style={{ color: textColor }}
            className="text-sm font-semibold uppercase tracking-[0.16em] mb-3"
          >
            Tip of the day
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {tipsOfTheDay.map((tip, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a",
                }}
                className="rounded-3xl border border-slate-200 px-4 py-3"
              >
                <Text style={{ color: textColor }} className="text-sm">
                  {tip}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={{ backgroundColor: cardBg, borderColor }}
          className="flex-row items-center rounded-2xl border px-4 py-2"
        >
          <MaterialIcons name="search" size={18} color={secondaryText} />
          <TextInput
            style={{ color: textColor }}
            placeholder="Search workouts..."
            placeholderTextColor={secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 ml-2 text-sm"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 220 }}
        className="flex-1 px-6 py-6"
      >
        <View style={{ gap: 20 }}>
          {/* Daily Stats Overview */}
          <View
            style={{
              backgroundColor: theme === "light" ? "#0f172a" : "#1e293b",
            }}
            className="rounded-3xl border border-black p-6 shadow-sm shadow-slate-400/50"
          >
            <Text
              style={{ color: "#f1f5f9" }}
              className="text-sm font-semibold mb-4"
            >
              TODAY&apos;S SUMMARY
            </Text>
            <View className="flex-row justify-between mb-6">
              <View>
                <Text
                  style={{ color: "#f1f5f9" }}
                  className="text-4xl font-bold"
                >
                  {user.todayCalories}
                </Text>
                <Text className="text-slate-300 text-xs mt-1">
                  Calories burned
                </Text>
              </View>
              <View>
                <Text
                  style={{ color: "#f1f5f9" }}
                  className="text-4xl font-bold"
                >
                  {user.streak}
                </Text>
                <Text className="text-slate-300 text-xs mt-1">Day streak</Text>
              </View>
              <View>
                <Text
                  style={{ color: "#f1f5f9" }}
                  className="text-4xl font-bold"
                >
                  {user.workoutsThisWeek}
                </Text>
                <Text className="text-slate-300 text-xs mt-1">This week</Text>
              </View>
            </View>
            <Text className="text-slate-300 text-xs mb-3">
              Calorie goal: {user.goalCalories} kcal
            </Text>
            <View className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
              <View
                style={{ width: `${caloriesPercent}%` }}
                className="h-full bg-green-500"
              />
            </View>
          </View>

          {/* Quick Action Button */}
          <Pressable
            onPress={() => router.push("/(tabs)/Workout")}
            className="rounded-3xl border border-black bg-gradient-to-r from-[#ef4444] to-[#dc2626] p-5 shadow-sm shadow-red-200/50 active:opacity-90"
          >
            <Text className="text-white text-center font-bold text-lg">
              + Start a Workout
            </Text>
            <Text className="text-red-100 text-center text-sm mt-1">
              Pick from 10 routines
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/Camera")}
            className="rounded-3xl border border-black bg-[#10b981] p-5 shadow-sm shadow-emerald-200/50 active:opacity-90"
          >
            <Text className="text-white text-center font-bold text-lg">
              Scan Food
            </Text>
            <Text className="text-emerald-100 text-center text-sm mt-1">
              Capture a meal photo for future analysis
            </Text>
          </Pressable>

          {/* Upcoming Workouts */}
          <View>
            <Text
              style={{ color: textColor }}
              className="text-lg font-semibold mb-3"
            >
              Upcoming
            </Text>
            {filteredUpcoming.length === 0 ? (
              <Text style={{ color: secondaryText }} className="text-sm">
                No workouts match your search
              </Text>
            ) : (
              filteredUpcoming.map((w, idx) => (
                <View
                  key={idx}
                  style={{ backgroundColor: cardBg, borderColor }}
                  className="rounded-2xl border p-4 mb-3 flex-row items-center"
                >
                  <Text className="text-2xl mr-3">{w.icon}</Text>
                  <View className="flex-1">
                    <Text
                      style={{ color: textColor }}
                      className="font-semibold"
                    >
                      {w.name}
                    </Text>
                    <Text
                      style={{ color: secondaryText }}
                      className="text-xs mt-1"
                    >
                      {w.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor:
                        theme === "light" ? "#e2e8f0" : "#334155",
                    }}
                    className="rounded-lg px-3 py-1"
                  >
                    <Text
                      style={{ color: secondaryText }}
                      className="text-xs font-semibold"
                    >
                      Scheduled
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Recent Activity */}
          <View>
            <Text
              style={{ color: textColor }}
              className="text-lg font-semibold mb-3"
            >
              Recent Activity
            </Text>
            {recentActivity.map((activity, idx) => (
              <View
                key={idx}
                style={{ backgroundColor: cardBg, borderColor }}
                className="rounded-2xl border p-4 mb-3 flex-row items-center justify-between"
              >
                <View>
                  <Text style={{ color: textColor }} className="font-semibold">
                    {activity.name}
                  </Text>
                  <Text
                    style={{ color: secondaryText }}
                    className="text-xs mt-1"
                  >
                    {activity.date} • {activity.duration}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: activity.accent }}
                  className="w-3 h-3 rounded-full"
                />
              </View>
            ))}
          </View>

          {/* Progress Overview */}
          <View
            style={{ backgroundColor: cardBg, borderColor }}
            className="rounded-3xl border p-6 shadow-sm"
          >
            <Text
              style={{ color: textColor }}
              className="text-lg font-semibold mb-4"
            >
              Weekly Progress
            </Text>
            <View className="space-y-3">
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text
                    style={{ color: secondaryText }}
                    className="text-sm font-semibold"
                  >
                    Workouts
                  </Text>
                  <Text
                    style={{ color: textColor }}
                    className="text-sm font-semibold"
                  >
                    4 / 6
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: borderColor }}
                  className="h-2 rounded-full overflow-hidden"
                >
                  <View className="h-full w-2/3 bg-blue-500" />
                </View>
              </View>
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text
                    style={{ color: secondaryText }}
                    className="text-sm font-semibold"
                  >
                    Calories
                  </Text>
                  <Text
                    style={{ color: textColor }}
                    className="text-sm font-semibold"
                  >
                    8.2k / 15.4k
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: borderColor }}
                  className="h-2 rounded-full overflow-hidden"
                >
                  <View className="h-full w-1/2 bg-green-500" />
                </View>
              </View>
            </View>
          </View>

          {/* Motivational Card */}
          <View
            style={{ backgroundColor: cardBg, borderColor }}
            className="rounded-3xl border p-6 shadow-sm border-l-4 border-l-orange-400"
          >
            <Text className="text-sm font-semibold text-orange-600 uppercase mb-2">
              Tip of the day
            </Text>
            <Text
              style={{ color: textColor }}
              className="text-base leading-7 font-medium"
            >
              Consistency beats intensity. Show up for 30 minutes every day
              rather than 2 hours once a week.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
