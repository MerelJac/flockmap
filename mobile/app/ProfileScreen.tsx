import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import AvatarUploader from "@/components/AvatarUploader";

export default function ProfileScreen({ navigation }: any) {
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
          onPress={() => navigation.navigate("Login")}
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
    else navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Welcome, {user.email}
      </Text>

      {/* Avatar upload */}
      <AvatarUploader userId={user.id} />

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#E53935",
          padding: 14,
          borderRadius: 8,
          marginTop: 40,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
