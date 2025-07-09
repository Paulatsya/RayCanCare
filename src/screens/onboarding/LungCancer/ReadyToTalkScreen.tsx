import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../../constants/theme';

export default function ReadyToTalkScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem('@hasOnboarded', 'true');
      navigation.replace('Chatbot'); // ✅ Go to chatbot
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>You're all set!</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Tap below to start chatting with Ray.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.secondary }]}
        onPress={handleFinish}
      >
        <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Talk to Ray</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
