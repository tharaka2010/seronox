import { Stack, useRouter } from "expo-router";
import { LanguageProvider } from './context/LanguageContext';
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function RootLayout() {
  const router = useRouter();

  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screen/mainLanding" />
        <Stack.Screen name="screen/features" />
        <Stack.Screen name="screen/news" />
        <Stack.Screen
          name="screen/notification"
          options={{
            headerShown: true,
            title: 'Notifications',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/screen/notification?selectionMode=true')}>
                <Feather name="trash-2" size={24} color="black" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="screen/profile" />
        <Stack.Screen name="screen/article/[id]" />
        <Stack.Screen name="screen/news/[id]" />
      </Stack>
    </LanguageProvider>
  );
}

