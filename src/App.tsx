import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { UserProvider } from './context/UserContext'; // 👈 Import your UserProvider

export default function App() {
  return (
    <UserProvider> {/* ✅ Wrap everything inside UserProvider */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
