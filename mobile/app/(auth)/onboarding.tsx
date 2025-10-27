import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("@/assets/images/icon.png")} // put your Flockmap logo here
        style={{ width: 120, height: 120, marginBottom: 40 }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Welcome to Flockmap 🗺️
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Discover, connect, and track your community in one place.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/(auth)/login-screen")}
        style={{
          backgroundColor: "black",
          paddingVertical: 14,
          paddingHorizontal: 60,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
