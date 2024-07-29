import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function FreePopsiclesScreen({ navigation, route }) {
  const { id } = route.params;

  const calculateStamps = async() => {
    try{
        fetch('http://192.168.0.73:5001/setStamps', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
                stampIncrease: -10
              }),
        })
    }
    catch{
        alert("Error: Could not decrease stamps by 10")
    }
    navigation.navigate("Confrim")
    }

  return (
    <View style={styles.container}>
        {/* Done Message */}
        <Text style={styles.text}>{id} has a free popsicle</Text>
        {/* Back and Confirm Buttons */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add", { id: id })}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateStamps}>
                <Text style={styles.buttonText}>Use</Text>
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