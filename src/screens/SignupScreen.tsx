import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signUp } from '../services/authfunctions';
import { lightTheme } from '../constants/theme';

const theme = lightTheme;

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      Alert.alert('Success', 'Account created! You can now log in.');
      navigation.replace('Welcome');
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={styles.linkBold}>Log In</Text>
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: theme.font.bold,
    color: theme.colors.textPrimary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 14,
    marginVertical: 10,
    borderRadius: 10,
    color: theme.colors.textPrimary,
    fontFamily: theme.font.regular,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  link: {
    marginTop: 24,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontFamily: theme.font.regular,
  },
  linkBold: {
    color: theme.colors.accent,
    fontFamily: theme.font.bold,
  },
});
