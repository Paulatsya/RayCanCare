import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { UserProvider } from './src/context/UserContext'; // 👈 Import your UserProvider

export default function App() {
  return (
    <UserProvider> {/* ✅ Wrap everything inside UserProvider */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
