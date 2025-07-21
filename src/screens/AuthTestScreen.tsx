import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AuthTestScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        navigation.replace('Login');
      } else {
        try {
          const hasOnboarded = await AsyncStorage.getItem('@hasOnboarded');
          console.log('Has onboarded:', hasOnboarded);
          if (hasOnboarded === 'true') {
            navigation.replace('ReadyToTalk'); // ✅ Skip onboarding
          } else {
            navigation.replace('Welcome'); // 🔁 Start onboarding
          }
        } catch (err) {
          console.error('Failed to read onboarding flag:', err);
          navigation.replace('Welcome');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
