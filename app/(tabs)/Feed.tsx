import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const feedContent = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "👩‍🦰",
    action: "completed",
    workout: "Upper Strength",
    time: "2 hours ago",
    likes: 24,
  },
  {
    id: 2,
    author: "Fitness Coach",
    avatar: "🏋️",
    action: "shared",
    content:
      "Tip: Progressive overload is the key to consistent gains. Increase weight or reps weekly.",
    time: "4 hours ago",
    likes: 156,
  },
  {
    id: 3,
    author: "Marcus Chen",
    avatar: "👨‍🦱",
    action: "completed",
    workout: "HIIT Sprint",
    time: "6 hours ago",
    likes: 42,
  },
  {
    id: 4,
    author: "Community Hub",
    avatar: "🎯",
    action: "challenge",
    content:
      "Join our 30-day consistency challenge. Log in daily to win rewards!",
    time: "1 day ago",
    likes: 389,
  },
  {
    id: 5,
    author: "Alex Morgan",
    avatar: "💪",
    action: "milestone",
    content: "🎉 Reached 100 consecutive days of workouts!",
    time: "1 day ago",
    likes: 73,
  },
];

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const { theme, colors } = useTheme();

  const filteredFeed = feedContent.filter(
    (item) =>
      item.author.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.workout &&
        item.workout.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.content &&
        item.content.toLowerCase().includes(searchText.toLowerCase())),
  );

  const bgColor = theme === "light" ? "#ffffff" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const secondaryText = theme === "light" ? "#64748b" : "#cbd5e1";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";
  const borderColor = theme === "light" ? "#e2e8f0" : "#334155";

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 pt-16">
      <View
        style={{ borderBottomColor: borderColor }}
        className="border-b bg-opacity-50 px-6 py-5"
      >
        <Text style={{ color: textColor }} className="text-2xl font-semibold">
          Feed
        </Text>
        <Text style={{ color: secondaryText }} className="text-sm mt-1">
          Community activity and tips
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
            placeholder="Search feed..."
            placeholderTextColor={secondaryText}
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 ml-2 text-base"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 220 }}
        className="px-6 py-2"
      >
        <View style={{ gap: 16 }}>
        {filteredFeed.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text style={{ color: secondaryText }} className="text-base">
              No results found
            </Text>
          </View>
        ) : (
          filteredFeed.map((item) => (
            <View
              key={item.id}
              style={{ backgroundColor: cardBg, borderColor }}
              className="rounded-2xl border p-4 shadow-sm"
            >
              {/* Author */}
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-2">{item.avatar}</Text>
                  <View>
                    <Text
                      style={{ color: textColor }}
                      className="font-semibold"
                    >
                      {item.author}
                    </Text>
                    <Text style={{ color: secondaryText }} className="text-xs">
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              {item.action === "completed" && (
                <View className="mb-3">
                  <Text style={{ color: textColor }} className="text-base mb-2">
                    <Text className="font-semibold">Completed</Text>{" "}
                    <Text
                      style={{ color: "#2563eb" }}
                      className="font-semibold"
                    >
                      {item.workout}
                    </Text>
                  </Text>
                  <View className="flex-row items-center space-x-2">
                    <View className="flex-1 h-1 bg-blue-500 rounded-full" />
                    <Text style={{ color: secondaryText }} className="text-xs">
                      +45 min
                    </Text>
                  </View>
                </View>
              )}

              {item.action === "shared" && (
                <Text
                  style={{ color: textColor }}
                  className="text-base mb-3 leading-6"
                >
                  {item.content}
                </Text>
              )}

              {item.action === "challenge" && (
                <View
                  style={{
                    backgroundColor: `${theme === "light" ? "#fef3c7" : "#78350f"}`,
                  }}
                  className="rounded-lg p-3 mb-3"
                >
                  <Text
                    style={{
                      color: `${theme === "light" ? "#92400e" : "#fcd34d"}`,
                    }}
                    className="text-sm font-semibold"
                  >
                    {item.content}
                  </Text>
                </View>
              )}

              {item.action === "milestone" && (
                <Text
                  style={{ color: textColor }}
                  className="text-base mb-3 font-semibold"
                >
                  {item.content}
                </Text>
              )}

              {/* Engagement */}
              <View className="flex-row items-center space-x-3">
                <Pressable className="flex-row items-center space-x-1">
                  <MaterialIcons
                    name="favorite-border"
                    size={18}
                    color={secondaryText}
                  />
                  <Text style={{ color: secondaryText }} className="text-xs">
                    {item.likes}
                  </Text>
                </Pressable>
                <Pressable className="flex-row items-center space-x-1">
                  <MaterialIcons
                    name="comment"
                    size={18}
                    color={secondaryText}
                  />
                  <Text style={{ color: secondaryText }} className="text-xs">
                    Reply
                  </Text>
                </Pressable>
                <Pressable className="flex-row items-center space-x-1">
                  <MaterialIcons name="share" size={18} color={secondaryText} />
                </Pressable>
              </View>
            </View>
          ))
        )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Feed;
