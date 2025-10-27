import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/app/(auth)/login-screen";
import RegisterScreen from "@/app/(auth)/register-screen";
import ForgotPasswordScreen from "@/app/(auth)/forgot-password-screen";
import ProfileScreen from "@/app/ProfileScreen";
import { useUser } from "@/hooks/useUser";

const Stack = createStackNavigator();

export default function App() {
  const { user, loading } = useUser();

  if (loading) return null; // or splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}