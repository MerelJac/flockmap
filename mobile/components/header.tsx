import React from "react";
import { Text } from "react-native";

export function Header({ text }: { text: string }) {
  return (
    <Text
      style={{
        marginTop: 50,
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 32,
        textAlign: "center",
      }}
    >
      {text}
    </Text>
  );
}
