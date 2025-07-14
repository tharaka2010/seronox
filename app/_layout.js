import { Stack } from "expo-router";
import { LanguageProvider } from './context/LanguageContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screen/mainLanding" />
        <Stack.Screen name="screen/features" />
        <Stack.Screen name="screen/news" />
        <Stack.Screen name="screen/notification" />
        <Stack.Screen name="screen/profile" />
        <Stack.Screen name="screen/article/[id]" />
        <Stack.Screen name="screen/news/[id]" />
      </Stack>
    </LanguageProvider>
  );
}

