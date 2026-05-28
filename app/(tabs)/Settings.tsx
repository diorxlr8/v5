import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const bgColor = theme === "light" ? "#bfd6e0" : "#0f172a";
  const textColor = theme === "light" ? "#0f172a" : "#f1f5f9";
  const secondaryText = theme === "light" ? "#64748b" : "#cbd5e1";
  const cardBg = theme === "light" ? "#f8fafc" : "#1e293b";
  const borderColor = theme === "light" ? "#e2e8f0" : "#334155";

  const settingSections = [
    {
      title: "Display",
      settings: [
        {
          id: "theme",
          name: "Dark Mode",
          icon: "dark-mode",
          toggle: true,
          value: theme === "dark",
          onChange: toggleTheme,
        },
      ],
    },
    {
      title: "Notifications",
      settings: [
        {
          id: "notif",
          name: "Workout Reminders",
          icon: "notifications",
          toggle: true,
          value: notifications,
          onChange: () => setNotifications(!notifications),
        },
        {
          id: "sound",
          name: "Sound Effects",
          icon: "volume-up",
          toggle: true,
          value: soundEnabled,
          onChange: () => setSoundEnabled(!soundEnabled),
        },
      ],
    },
    {
      title: "Privacy & Security",
      settings: [
        {
          id: "private",
          name: "Private Profile",
          icon: "lock",
          toggle: true,
          value: privateProfile,
          onChange: () => setPrivateProfile(!privateProfile),
        },
        {
          id: "data",
          name: "Data & Privacy",
          icon: "privacy-tip",
          toggle: false,
        },
      ],
    },
    {
      title: "Account",
      settings: [
        { id: "email", name: "Email Settings", icon: "email", toggle: false },
        {
          id: "password",
          name: "Change Password",
          icon: "security",
          toggle: false,
        },
        { id: "delete", name: "Delete Account", icon: "delete", toggle: false },
      ],
    },
    {
      title: "About",
      settings: [
        { id: "version", name: "App Version", icon: "info", version: "1.0.0" },
        {
          id: "feedback",
          name: "Send Feedback",
          icon: "feedback",
          toggle: false,
        },
      ],
    },
  ];

  const filteredSections = settingSections
    .map((section) => ({
      ...section,
      settings: section.settings.filter(
        (setting) =>
          setting.name.toLowerCase().includes(searchText.toLowerCase()) ||
          section.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    }))
    .filter((section) => section.settings.length > 0);

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 pt-16">
      <View
        style={{ borderBottomColor: borderColor }}
        className="border-b bg-opacity-50 px-6 py-5"
      >
        <Text style={{ color: textColor }} className="text-2xl font-semibold">
          Settings
        </Text>
        <Text style={{ color: secondaryText }} className="text-sm mt-1">
          Manage preferences and account
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
            placeholder="Search settings..."
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
        {filteredSections.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text style={{ color: secondaryText }} className="text-base">
              No settings found
            </Text>
          </View>
        ) : (
          filteredSections.map((section, idx) => (
            <View key={idx} className="mb-6">
              <Text
                style={{ color: textColor }}
                className="text-sm font-bold uppercase mb-3 opacity-70"
              >
                {section.title}
              </Text>

              {section.settings.map((setting, settingIdx) => (
                <View
                  key={setting.id}
                  style={{ backgroundColor: cardBg, borderColor }}
                  className={`border rounded-2xl px-4 py-4 flex-row items-center justify-between ${
                    settingIdx < section.settings.length - 1 ? "mb-3" : ""
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <View
                      className="rounded-lg p-2 mr-3"
                      style={{
                        backgroundColor:
                          theme === "light" ? "#f0f9ff" : "#0c2340",
                      }}
                    >
                      <MaterialIcons
                        name={setting.icon as any}
                        size={20}
                        color={
                          setting.id === "delete"
                            ? "#ef4444"
                            : setting.id === "theme"
                              ? "#f97316"
                              : "#2563eb"
                        }
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color:
                            setting.id === "delete" ? "#ef4444" : textColor,
                        }}
                        className="font-semibold text-base"
                      >
                        {setting.name}
                      </Text>
                      {(setting as any).version && (
                        <Text
                          style={{ color: secondaryText }}
                          className="text-xs mt-1"
                        >
                          {(setting as any).version}
                        </Text>
                      )}
                    </View>
                  </View>

                  {setting.toggle ? (
                    <Switch
                      value={setting.value as boolean}
                      onValueChange={setting.onChange as any}
                      trackColor={{
                        false: borderColor,
                        true: "#2563eb",
                      }}
                      thumbColor={
                        (setting.value as boolean) ? "#ba2222" : "#cbd5e1"
                      }
                    />
                  ) : (
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color={secondaryText}
                    />
                  )}
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Settings;
