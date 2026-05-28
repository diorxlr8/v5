import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useWorkout } from "../context/WorkoutContext";

type Routine = {
  id: string;
  title: string;
  progress: number; // 0-100
  completed: boolean;
  dateCompleted?: string;
};

const initialUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
  memberSince: "2024-10-01",
};

const INITIAL_ROUTINES: Routine[] = [
  {
    id: "r1",
    title: "Full Body Blast",
    progress: 100,
    completed: true,
    dateCompleted: "2025-05-01",
  },
  { id: "r2", title: "Upper Strength", progress: 45, completed: false },
  { id: "r3", title: "Core & Mobility", progress: 20, completed: false },
  {
    id: "r4",
    title: "Leg Day",
    progress: 100,
    completed: true,
    dateCompleted: "2025-03-12",
  },
];

export default function You() {
  const [user] = useState(initialUser);
  const [routines, setRoutines] = useState<Routine[]>(INITIAL_ROUTINES);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const { selectedWorkouts, removeWorkout } = useWorkout();
  const { theme } = useTheme();

  const bgColor = theme === "light" ? "#a4d8b6" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const secondaryText = theme === "light" ? "#64748b" : "#cbd5e1";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";
  const borderColor = theme === "light" ? "#e2e8f0" : "#334155";

  const progressRoutines = selectedWorkouts.map((workout) => ({
    id: workout.id,
    title: workout.name,
    progress: workout.progress,
    completed: workout.progress >= 100,
  }));

  const completed = [
    ...routines.filter((r) => r.completed),
    ...progressRoutines.filter((r) => r.completed),
  ];
  const inProgress = [
    ...routines.filter((r) => !r.completed),
    ...progressRoutines.filter((r) => !r.completed),
  ];

  const filteredInProgress = inProgress.filter((r) =>
    r.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  const filteredCompleted = completed.filter((r) =>
    r.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const overallPercent = Math.round(
    (routines.reduce((sum, r) => sum + r.progress, 0) +
      progressRoutines.reduce((sum, r) => sum + r.progress, 0)) /
      Math.max(1, routines.length + progressRoutines.length),
  );

  const toggleComplete = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              completed: !r.completed,
              progress: r.completed ? 10 : 100,
              dateCompleted: r.completed
                ? undefined
                : new Date().toISOString().slice(0, 10),
            }
          : r,
      ),
    );
  };

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 pt-16 px-6">
      <View
        style={{ borderBottomColor: borderColor }}
        className="border-b mb-4"
      >
        <Text style={{ color: textColor }} className="text-2xl font-semibold">
          You
        </Text>
        <Text style={{ color: secondaryText }} className="text-sm mt-2">
          Account overview and routines
        </Text>
      </View>

      {/* Search Bar */}
      <View className="mb-4">
        <View
          style={{ backgroundColor: cardBg, borderColor }}
          className="flex-row items-center rounded-2xl border px-4 py-3"
        >
          <MaterialIcons name="search" size={20} color={secondaryText} />
          <TextInput
            style={{ color: textColor }}
            placeholder="Search routines..."
            placeholderTextColor={secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 ml-2 text-base"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>
        <View
          style={{ backgroundColor: cardBg, borderColor }}
          className="rounded-3xl border p-6 mb-6 shadow-sm"
        >
          <Text style={{ color: textColor }} className="font-semibold mb-3">
            {user.name}
          </Text>
          <Text style={{ color: secondaryText }} className="text-sm">
            {user.email}
          </Text>
          <Text style={{ color: secondaryText }} className="text-xs mt-2">
            Member since {user.memberSince}
          </Text>

          <View className="mt-4 flex-row justify-between">
            <View
              style={{ backgroundColor: bgColor, borderColor }}
              className="rounded-lg border p-3 w-1/2 mr-2"
            >
              <Text style={{ color: secondaryText }} className="text-xs">
                Completed
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-lg font-semibold mt-1"
              >
                {completed.length}
              </Text>
            </View>
            <View
              style={{ backgroundColor: bgColor, borderColor }}
              className="rounded-lg border p-3 w-1/2 ml-2"
            >
              <Text style={{ color: secondaryText }} className="text-xs">
                In progress
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-lg font-semibold mt-1"
              >
                {inProgress.length}
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text
            style={{ color: textColor }}
            className="text-lg font-semibold mb-3"
          >
            Progress overview
          </Text>
          <View
            style={{ backgroundColor: borderColor }}
            className="mt-3 rounded-full h-3 overflow-hidden"
          >
            <View
              style={{
                width: `${overallPercent}%`,
                height: "100%",
                backgroundColor: "#102a43",
              }}
            />
          </View>
          <Text style={{ color: secondaryText }} className="text-sm mt-2">
            Overall completion: {overallPercent}%
          </Text>

          <View className="mt-4">
            <Text
              style={{ color: textColor }}
              className="text-sm font-semibold mb-3"
            >
              Recent routines
            </Text>
            {routines.slice(0, 6).map((r) => (
              <View key={r.id} className="mt-3">
                <Text style={{ color: secondaryText }} className="text-sm">
                  {r.title}
                </Text>
                <View
                  style={{ backgroundColor: borderColor }}
                  className="mt-1 rounded-full h-2 overflow-hidden"
                >
                  <View
                    style={{
                      width: `${r.progress}%`,
                      height: "100%",
                      backgroundColor: "#2563eb",
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text
            style={{ color: textColor }}
            className="text-lg font-semibold mb-3"
          >
            In progress
          </Text>
          {filteredInProgress.length === 0 ? (
            <Text style={{ color: secondaryText }} className="text-sm">
              No routines in progress
            </Text>
          ) : (
            <View style={{ gap: 12 }}>
              {filteredInProgress.map((r) => {
                const isSelectedWorkout = selectedWorkouts.some(
                  (w) => w.id === r.id,
                );
                return (
                  <View
                    key={r.id}
                    style={{ backgroundColor: cardBg, borderColor }}
                    className="rounded-2xl border p-4 shadow-sm"
                  >
                    <View className="flex-row items-center justify-between">
                      <View>
                        <Text
                          style={{ color: textColor }}
                          className="font-semibold"
                        >
                          {r.title}
                        </Text>
                        <Text
                          style={{ color: secondaryText }}
                          className="text-sm mt-1"
                        >
                          Progress: {r.progress}%
                        </Text>
                      </View>
                      <View className="flex-row items-center space-x-2">
                        {isSelectedWorkout ? (
                          <Pressable
                            onPress={() => removeWorkout(r.id)}
                            className="rounded-md bg-[#fee2e2] px-3 py-2"
                          >
                            <Text className="text-sm text-[#991b1b]">
                              Remove
                            </Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => toggleComplete(r.id)}
                            className="rounded-md bg-[#e9f0fb] px-3 py-2"
                          >
                            <Text className="text-sm text-[#102a43]">
                              Mark done
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <Text
            style={{ color: textColor }}
            className="text-lg font-semibold mt-6 mb-3"
          >
            Completed
          </Text>
          {filteredCompleted.length === 0 ? (
            <Text style={{ color: secondaryText }} className="text-sm">
              No completed routines
            </Text>
          ) : (
            <View style={{ gap: 12 }}>
              {filteredCompleted.map((r) => (
                <View
                  key={r.id}
                  style={{ backgroundColor: cardBg, borderColor }}
                  className="rounded-2xl border p-4 shadow-sm"
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text
                        style={{ color: textColor }}
                        className="font-semibold"
                      >
                        {r.title}
                      </Text>
                      <Text
                        style={{ color: secondaryText }}
                        className="text-sm mt-1"
                      >
                        Finished on {r.dateCompleted}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => toggleComplete(r.id)}
                      className="rounded-md bg-[#fff1f2] px-3 py-2"
                    >
                      <Text className="text-sm text-[#86181d]">
                        Mark undone
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View
            style={{ backgroundColor: cardBg, borderColor }}
            className="mt-6 rounded-3xl border p-4 shadow-sm"
          >
            <Text
              style={{ color: textColor }}
              className="text-lg font-semibold"
            >
              BMI Calculator
            </Text>
            <Text style={{ color: secondaryText }} className="text-sm mt-2">
              Enter your weight (kg) and height (cm)
            </Text>

            <View className="mt-3">
              <TextInput
                style={{
                  color: textColor,
                  borderColor,
                  backgroundColor: bgColor,
                }}
                placeholder="Weight (kg)"
                placeholderTextColor={secondaryText}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="rounded-lg border px-4 py-3 mb-2"
              />
              <TextInput
                style={{
                  color: textColor,
                  borderColor,
                  backgroundColor: bgColor,
                }}
                placeholder="Height (cm)"
                placeholderTextColor={secondaryText}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                className="rounded-lg border px-4 py-3 mb-3"
              />
              <Pressable
                onPress={() => {
                  const w = parseFloat(weight);
                  const h = parseFloat(height);
                  if (w > 0 && h > 0) {
                    const bmi = w / ((h / 100) * (h / 100));
                    setBmiResult(Math.round(bmi * 10) / 10);

                    if (bmi < 18.5) setBmiCategory("Underweight");
                    else if (bmi < 25) setBmiCategory("Normal weight");
                    else if (bmi < 30) setBmiCategory("Overweight");
                    else setBmiCategory("Obese");
                  }
                }}
                className="rounded-lg bg-blue-600 px-4 py-3"
              >
                <Text className="text-center font-semibold text-white">
                  Calculate BMI
                </Text>
              </Pressable>

              {bmiResult !== null && (
                <View
                  style={{ backgroundColor: cardBg, borderColor }}
                  className="mt-4 rounded-lg border p-4"
                >
                  <Text style={{ color: textColor }} className="font-semibold">
                    Your BMI: {bmiResult}
                  </Text>
                  <Text
                    style={{ color: secondaryText }}
                    className="text-sm mt-1"
                  >
                    Category: {bmiCategory}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
