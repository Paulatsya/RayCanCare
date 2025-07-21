import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../../constants/theme';

export default function PredictionResultScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const { severity, suggestion } = route.params || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.textPrimary }]}>🩺 Prediction Result</Text>

      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Severity:</Text>
      <Text style={[styles.severity, { color: theme.colors.primary }]}>
        {severity || "N/A"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Suggested Plan:</Text>
      <Text style={[styles.suggestion, { color: theme.colors.textPrimary }]}>
        {suggestion || "No suggestion available."}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.secondary }]}
        onPress={() => navigation.navigate('ReadyToTalkScreen')} // Or replace with 'ReadyToTalkScreen'
      >
        <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  severity: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  suggestion: {
    fontSize: 16,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});