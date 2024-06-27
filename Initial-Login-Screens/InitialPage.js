import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

// For some reason we have access to the navigation prop because we have set up our stack navigation elsewhere
// This is because home is a SCREEN COMPONENT, so that is why we can access it
export default function InitialPage({ navigation }) {
    return (
        <View style = {styles.view}>
            <Text>Initial Page</Text>
            <Button 
                title="Go to User Login" 
                onPress={() => navigation.navigate('User Login')} 
            />
            <Button 
                title="Go to Admin Login"
                onPress={() => navigation.navigate('Admin Login')} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }
})