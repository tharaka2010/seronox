import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="nextPage" />
      <Stack.Screen name="registration" />
    </Stack>
  );
}