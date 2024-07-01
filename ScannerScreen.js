import { View, Text, StyleSheet, Button } from 'react-native';

export default function ScannerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanner will go here</Text>
      <Button title="Add Rewards" onPress={() => navigation.navigate("Add")} />
      <Button title="Back" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
