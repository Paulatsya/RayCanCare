// components/AppHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';

export default function AppHeader() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err: any) {
      alert(err.message || 'Failed to logout');
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.divider }]}>
      {navigation.canGoBack() ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.button, { color: theme.colors.primary }]}>⬅ Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 60 }} /> // Placeholder to align title
      )}

      <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.font.bold }]}>
        {route.name}
      </Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={[styles.button, { color: theme.colors.error }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  button: {
    fontSize: 16,
  },
});
