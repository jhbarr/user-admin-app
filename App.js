import * as React from 'react';
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
