import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert("Login failed", error.message);
    else Alert.alert("Success", "Logged in!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 20, padding: 10 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "black", padding: 14, borderRadius: 8 }}
        disabled={loading}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password-screen")}>
        <Text style={{ marginTop: 20, color: "blue", textAlign: "center" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register-screen")}>
        <Text style={{ marginTop: 10, color: "blue", textAlign: "center" }}>
          Don&apos;t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
