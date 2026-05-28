import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View className="flex-1 bg-[#f7fbf4] px-6 py-10 justify-center items-center">
      <View className="space-y-3 items-center text-center">
        <Text className="text-3xl font-bold text-[#1f4d1f]">
          Welcome to Fit_Fusion
        </Text>
        <Text className="text-sm text-[#3f703f] max-w-[320px]">
          Sign in to your account and continue to the app to attain you gym body
        </Text>
      </View>

      <View className="mt-10 w-full max-w-md rounded-[32px] border border-[#d9e9d4] bg-white p-6 shadow-lg shadow-[#b7d7b7]/30">
        <Text className="text-sm uppercase tracking-[0.2em] text-[#5f8f3f]">
          Email
        </Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor="#9bb89d"
          className="mb-5 mt-2 rounded-2xl border border-[#d9e9d4] bg-[#f6fbf4] px-4 py-3 text-base text-[#1d3c1d]"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-sm uppercase tracking-[0.2em] text-[#5f8f3f]">
          Password
        </Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#9bb89d"
          secureTextEntry
          className="mb-7 mt-2 rounded-2xl border border-[#d9e9d4] bg-[#f6fbf4] px-4 py-3 text-base text-[#1d3c1d]"
        />

        <Pressable className="rounded-2xl bg-[#f4d556] px-5 py-4">
          <Text className="text-center text-base font-semibold text-[#1f3c1f]">
            Log in
          </Text>
        </Pressable>

        <View className="mt-5 flex-col items-center gap-2">
          <Text className="text-sm text-[#4f7f4f]">No account yet?</Text>
          <Link href="./Signup" asChild>
            <Text className="text-sm font-semibold text-[#1f4d1f]">
              Create one
            </Text>
          </Link>
        </View>
      </View>

      <View className="mt-6 items-center">
        <Link href="/" asChild>
          <Pressable className="rounded-2xl border border-[#c0dba9] px-6 py-3 bg-white">
            <Text className="text-sm font-semibold text-[#1f4d1f]">
              Back to Home
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Login;
