import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function ConfirmScreen({ navigation, route }) {
  const { id } = route.params;
  const { stamps } = route.params;

  return (
    <View style={styles.container}>
        {/* Done Message */}
        <Text style={styles.text}>DONE!</Text>
        <Text>{id} has {stamps} stamps</Text>
        <Text>{stamps}</Text>
        {/* Back and Confirm Buttons */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add", { id: id })}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
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
    color: "#4CAF50",
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
