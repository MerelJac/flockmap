import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function MessagesScreen() {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("User not authenticated");

        // ✅ Fetch chats from your Express backend
        const res = await fetch(`http://localhost:3000/api/chats`, {
          headers: { "x-user-id": user.id },
        });
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!chats.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No chats yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/pages/chat?chatId=${item.id}`)}
          style={{
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ color: "#666" }}>
            {item.last_message_preview || "No messages yet"}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
