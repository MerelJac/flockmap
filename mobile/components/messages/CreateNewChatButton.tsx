import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import React from "react";

export default function CreateNewChatButton() {
  return (
    <Button
      onPress={() => router.push("/pages/chat")}
      color="#841584"
      accessibilityLabel="Start new chat"
    >
      +
    </Button>
  );
}
