import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../../constants/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.View animation="fadeInDown" style={styles.imageContainer}>
        <Image
          source={require('../../assets/RayWaving.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.Text animation="fadeInUp" delay={300} style={[styles.title, { color: theme.colors.textPrimary }]}>
        Hi, I am Ray! 💜
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" delay={600}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={() => navigation.navigate('RoleSelection')}
        >
          <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Get Started</Text>
        </TouchableOpacity>

        {/* Only show 'Chat with Ray' if user is NOT logged in */}
        {!isLoggedIn && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.secondary, marginTop: 16 }]}
            onPress={() => navigation.navigate('Chatbot')}
          >
            <Text style={[styles.buttonText, { color: theme.colors.textPrimary }]}>Chat with Ray</Text>
          </TouchableOpacity>
        )}
      </Animatable.View>
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
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
