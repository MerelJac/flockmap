import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding"/>
      <Stack.Screen name="login-screen" />
      <Stack.Screen name="register-screen" />
      <Stack.Screen name="forgot-password-screen" />
    </Stack>
  );
}
