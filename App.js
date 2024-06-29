import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from './context/AuthContext';

import MainNavigationController from './navigation/MainNavigationController';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigationController />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
