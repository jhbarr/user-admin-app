import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function AddScreen({ navigation, route }) {
  const [quantity, setQuantity] = useState(''); // State for quantity as string
  const { id } = route.params;

  const minusQuantity = () => {
    if (quantity === '' || parseInt(quantity, 10) <= 1) {
      setQuantity('1'); // Set to '1' if empty or less than 1
    } else {
      setQuantity((parseInt(quantity, 10) - 1).toString());
    }
  };

  const plusQuantity = () => {
    if (quantity === '') {
      setQuantity('1'); // Start from '1' if empty
    } else {
      setQuantity((parseInt(quantity, 10) + 1).toString());
    }
  };

  const calculateStamps = () => {
    const updatedStamps = -1;
    try{
      fetch('http://192.168.0.73:5001/setStamps', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              stampIncrease: quantity
            }),
      })
  }
  catch{
      alert("Error: Could not increase stamps by " + quantity)
  }

  try{
    updatedStamps = fetch('http://192.168.0.73:5001/getStamps', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
    })
  }
  catch{
    alert("Error: Could not fetch stamps for user ID: " + id)
  }

    if(updatedStamps >= 10) {
      navigation.navigate("Use", { id: id })
    } else {
      navigation.navigate("Confirm", { id: id, stamps: updatedStamps })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add</Text>
      <Text style={styles.scannedDataText}>Scanned id: {id}</Text>
      <View style={styles.quantityContainer}>
        {/* Minus button */}
        <TouchableOpacity style={styles.button} onPress={minusQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        {/* Quantity input */}
        <TextInput
          style={styles.quantityInput}
          value={quantity}
          onChangeText={text => {
            const newQuantity = text.trim(); // Trim whitespace
            if (!isNaN(newQuantity) && newQuantity !== '') {
              setQuantity(newQuantity);
            } else {
              setQuantity(''); // Handle invalid input as empty
            }
          }}
          keyboardType="numeric"
        />

        {/* Plus button */}
        <TouchableOpacity style={styles.button} onPress={plusQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons container */}
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Scanner")}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calculateStamps}>
          <Text style={styles.buttonText}>Add</Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    height: 40,
    width: 80,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 10,
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
