import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/lib/supabase";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("Check your email", "We’ve sent you a confirmation link.");
      navigation.navigate("Login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
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
        onPress={handleRegister}
        style={{ backgroundColor: "black", padding: 14, borderRadius: 8 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
