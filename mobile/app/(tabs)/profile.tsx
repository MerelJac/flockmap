import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import AvatarUploader from "@/components/AvatarUploader";
import { router } from "expo-router";
import { Header } from "@/components/header";

export default function ProfileScreen() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>You are not logged in.</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login-screen")}
          style={{
            backgroundColor: "black",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Text style={{ color: "white" }}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Logout failed", error.message);
    else router.replace("/(auth)/login-screen");
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Header text="My Profile"/>


      <AvatarUploader userId={user.id} />

      <Text style={{ marginTop: 20, fontSize: 16 }}>Email: {user.email}</Text>
      <Text style={{ marginTop: 10, fontSize: 16 }}>User ID: {user.id}</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#E53935",
          padding: 14,
          borderRadius: 8,
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
