import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../constants/theme';

export default function AuthTestScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      try {
        // 1. Check if user is logged in by looking for a token
        const userToken = await AsyncStorage.getItem('@userToken');
        if (!userToken) {
          // No token means user is not logged in; go to Login
          navigation.replace('Login');
          return;
        }
        // 2. If logged in, check if onboarding is completed
        const hasOnboarded = await AsyncStorage.getItem('@hasOnboarded');
        if (hasOnboarded === 'true') {
          // Already onboarded: go straight to Chatbot
          navigation.replace('Chatbot');
        } else {
          // Not onboarded yet: start onboarding flow
          navigation.replace('Welcome');
        }
      } catch (error) {
        console.error('Error checking auth/onboarding status:', error);
        // In case of error, send to Login as a fallback
        navigation.replace('Login');
      }
    };

    checkAuthAndOnboarding();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.secondary} />
      <Text style={[styles.title, { color: theme.colors.textPrimary, marginTop: 20 }]}>
        Checking user status...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
