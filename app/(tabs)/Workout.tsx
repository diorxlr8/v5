import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useWorkout } from "../context/WorkoutContext";

const WORKOUTS = [
  {
    id: "w1",
    name: "Full Body Blast",
    category: "Strength",
    parts: ["Chest", "Back", "Legs"],
    details:
      "3 rounds: 10 push-ups, 15 squats, 10 bent-over rows, 30s plank. Rest 60s between rounds.",
    accent: "#ef4444",
  },
  {
    id: "w2",
    name: "Upper Strength",
    category: "Strength",
    parts: ["Chest", "Shoulders", "Arms"],
    details:
      "4 sets: bench press 8-10, overhead press 8-10, biceps curls 10-12. Stretch after.",
    accent: "#2563eb",
  },
  {
    id: "w3",
    name: "Leg Day",
    category: "Strength",
    parts: ["Quads", "Hamstrings", "Glutes"],
    details: "5 sets: squats 5-8, lunges 12 each, Romanian deadlifts 8-10.",
    accent: "#16a34a",
  },
  {
    id: "w4",
    name: "Core & Mobility",
    category: "Mobility",
    parts: ["Core", "Flexibility"],
    details:
      "3 rounds: 45s hollow hold, 20 Russian twists, 60s mobility flow focusing on hips and thoracic spine.",
    accent: "#f97316",
  },
  {
    id: "w5",
    name: "HIIT Sprint",
    category: "Cardio",
    parts: ["Cardio"],
    details: "20 min HIIT: 30s sprint / 30s rest — repeat. Great for fat loss.",
    accent: "#ef4444",
  },
  {
    id: "w6",
    name: "Yoga Flow",
    category: "Mobility",
    parts: ["Flexibility", "Mobility"],
    details: "30 min vinyasa flow to build mobility and breathing control.",
    accent: "#2563eb",
  },
  {
    id: "w7",
    name: "Cardio Endurance",
    category: "Cardio",
    parts: ["Cardio"],
    details: "40 min steady-state cardio at moderate intensity.",
    accent: "#f97316",
  },
  {
    id: "w8",
    name: "Pilates Core",
    category: "Mobility",
    parts: ["Core"],
    details: "45 min pilates focusing on controlled core engagement.",
    accent: "#16a34a",
  },
  {
    id: "w9",
    name: "Upper Mobility",
    category: "Mobility",
    parts: ["Shoulders", "Thoracic"],
    details: "20 min mobility drills for shoulders and thoracic spine.",
    accent: "#0f172a",
  },
  {
    id: "w10",
    name: "Stretch & Recover",
    category: "Mobility",
    parts: ["Recovery"],
    details: "15 min guided stretching and foam rolling for recovery.",
    accent: "#f59e0b",
  },
];
export default function Workout() {
  const [selected, setSelected] = useState(null as any);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { selectedWorkouts, addWorkout } = useWorkout();
  const { theme } = useTheme();

  const bgColor = theme === "light" ? "#ffffff" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const secondaryText = theme === "light" ? "#64748b" : "#cbd5e1";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";
  const borderColor = theme === "light" ? "#e2e8f0" : "#334155";

  const filteredWorkouts = WORKOUTS.filter(
    (w) =>
      (activeCategory === "All" || w.category === activeCategory) &&
      (w.name.toLowerCase().includes(searchText.toLowerCase()) ||
        w.parts.some((p) => p.toLowerCase().includes(searchText.toLowerCase()))),
  );

  useEffect(() => {
    const onBackPress = () => {
      if (selected) {
        setSelected(null);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );
    return () => subscription.remove();
  }, [selected]);

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 pt-16">
      <View
        style={{ borderBottomColor: borderColor }}
        className="border-b px-6 py-5"
      >
        <Text style={{ color: textColor }} className="text-2xl font-semibold">
          Workouts
        </Text>
        <Text style={{ color: secondaryText }} className="text-sm mt-1">
          Choose a routine to view details.
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View
          style={{ backgroundColor: cardBg, borderColor }}
          className="flex-row items-center rounded-2xl border px-4 py-3"
        >
          <MaterialIcons name="search" size={20} color={secondaryText} />
          <TextInput
            style={{ color: textColor }}
            placeholder="Search workouts..."
            placeholderTextColor={secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 ml-2 text-base"
          />
        </View>
      </View>

      {/* Category Filter Pills */}
      <View className="px-6 pb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-2"
          contentContainerStyle={{ gap: 8 }}
        >
          {["All", "Strength", "Cardio", "Mobility"].map((cat) => {
            const isActive = activeCategory === cat;
            const btnBg = isActive
              ? theme === "light"
                ? "#102a43"
                : "#38bdf8"
              : cardBg;
            const btnText = isActive
              ? "#ffffff"
              : theme === "light"
                ? "#475569"
                : "#cbd5e1";
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: btnBg,
                  borderColor: isActive ? "transparent" : borderColor,
                }}
                className="rounded-full border px-4 py-2"
              >
                <Text
                  style={{
                    color: btnText,
                  }}
                  className="text-sm font-semibold"
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 220 }}
        className="px-6 py-4"
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 }}>
          {filteredWorkouts.map((w) => {
            const isSelected = selectedWorkouts.some((sw) => sw.id === w.id);
            return (
              <View
                key={w.id}
                style={{
                  backgroundColor: cardBg,
                  borderColor,
                  width: "48.2%",
                }}
                className="overflow-hidden rounded-[24px] border shadow-sm"
              >
                <Pressable
                  onPress={() => setSelected(w)}
                  className="p-4 flex-1 flex-col justify-between"
                >
                  <View>
                    {/* Visual dot & category */}
                    <View className="flex-row items-center space-x-1.5 mb-2.5">
                      <View
                        style={{ backgroundColor: w.accent }}
                        className="w-2.5 h-2.5 rounded-full"
                      />
                      <Text
                        style={{ color: secondaryText }}
                        className="text-[10px] uppercase font-bold tracking-wider"
                      >
                        {w.category}
                      </Text>
                    </View>

                    <Text
                      style={{ color: textColor }}
                      className="text-base font-bold leading-5 mb-1"
                    >
                      {w.name}
                    </Text>
                    <Text
                      style={{ color: secondaryText }}
                      className="text-[11px] leading-4 mb-4"
                      numberOfLines={2}
                    >
                      Trains: {w.parts.join(", ")}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      addWorkout({ id: w.id, name: w.name, parts: w.parts })
                    }
                    style={{
                      backgroundColor: isSelected
                        ? theme === "light"
                          ? "#d1fae5"
                          : "#065f46"
                        : theme === "light"
                          ? "#f1f5f9"
                          : "#1e293b",
                      borderColor: isSelected
                        ? theme === "light"
                          ? "#34d399"
                          : "#059669"
                        : borderColor,
                    }}
                    className="rounded-full border py-1.5 px-3 flex-row items-center justify-center gap-1 mt-auto"
                  >
                    <MaterialIcons
                      name={isSelected ? "check" : "add"}
                      size={14}
                      color={
                        isSelected
                          ? theme === "light"
                            ? "#065f46"
                            : "#34d399"
                          : theme === "light"
                            ? "#475569"
                            : "#cbd5e1"
                      }
                    />
                    <Text
                      style={{
                        color: isSelected
                          ? theme === "light"
                            ? "#065f46"
                            : "#34d399"
                          : theme === "light"
                            ? "#475569"
                            : "#cbd5e1",
                      }}
                      className="text-xs font-semibold text-center"
                    >
                      {isSelected ? "Added" : "Add"}
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={!!selected}
        animationType="slide"
        transparent
        onRequestClose={() => setSelected(null)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View
            style={{ backgroundColor: cardBg, borderColor }}
            className="w-full max-w-md rounded-3xl border p-6 shadow-lg"
          >
            <Text
              style={{ color: textColor }}
              className="text-xl font-semibold mb-2"
            >
              {selected?.name}
            </Text>
            <Text style={{ color: secondaryText }} className="text-sm mb-4">
              Targets: {selected?.parts?.join(", ")}
            </Text>
            <Text
              style={{ color: textColor }}
              className="text-base mb-6 leading-7"
            >
              {selected?.details}
            </Text>

            <Pressable
              onPress={() => setSelected(null)}
              className="mt-2 rounded-lg bg-[#0f172a] px-4 py-3"
            >
              <Text className="text-center text-white font-semibold">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
