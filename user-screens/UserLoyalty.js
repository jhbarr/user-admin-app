import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import QRCode from "react-native-qrcode-svg";

export default function UserLoyalty({ navigation }) {
    const { authState } = useAuth()

    return (
        <View style = {styles.view}>
            <QRCode 
                value={authState?.id} 
                size={200} 
                color="black"
                backgroundColor="white"
            /> 
            <Text style={styles.text}>ID: {authState?.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    text: {
        marginTop: 20
    }
})