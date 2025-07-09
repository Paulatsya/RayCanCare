// ConsentSummaryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import { saveUserData } from '../../../services/firestorefunctions';
import { useUser } from '../../../context/UserContext';

export default function ConsentSummaryScreen() {
  const navigation = useNavigation<any>();
  const { userInfo } = useUser();

  const handleContinue = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('User not authenticated');
        return;
      }

      await saveUserData(user.uid, userInfo);
      await AsyncStorage.setItem('@hasOnboarded', 'true');

      navigation.replace('ReadyToTalk');
    } catch (err) {
      console.error('Failed to save user data:', err);
      Alert.alert('Error', 'Failed to save your information.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>Tap below to start chatting with Ray.</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Talk to Ray</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1C1C2E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF9BB3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
