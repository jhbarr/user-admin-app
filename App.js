import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import InitialLoginLayout from './navigation/InitialLoginLayout';

export default function App() {
  return (
    <NavigationContainer>
      <InitialLoginLayout />
    </NavigationContainer>
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
