import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

// For some reason we have access to the navigation prop because we have set up our stack navigation elsewhere
// This is because home is a SCREEN COMPONENT, so that is why we can access it
export default function AdminHome() {
    return (
        <View style = {styles.view}>
            <Text>Admin Home Page</Text>
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