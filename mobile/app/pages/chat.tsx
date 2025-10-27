import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const loadMessages = async () => {
    const res = await fetch(`http://localhost:3000/api/chats/${chatId}/messages`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();

    // Realtime updates via Supabase
    const channel = supabase
      .channel(`messages:${chatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
        (payload) => setMessages((m) => [...m, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await fetch(`http://localhost:3000/api/chats/${chatId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: user.id, content: text }),
    });

    setText("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 6 }}>
            <Text style={{ fontWeight: "600" }}>{item.sender_id}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={{ flexDirection: "row", margin: 12 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type message..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: "black",
            borderRadius: 20,
            marginLeft: 8,
            paddingHorizontal: 16,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
