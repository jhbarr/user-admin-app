import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { auth } from "../FireBaseConfig";
import { useAuth, useIsMount } from "../context/AuthContext";
import { io } from "socket.io-client";

export default function UserHome({ navigation }) {
    const { authState, setAuthState } = useAuth()

    const signOut = () => {
        auth.signOut()
        setAuthState({
            authenticated: null,
            email: null,
            role: null,
            id: null,
        })
    }

    return (
        <View style = {styles.container}>
            <Text>User Home Page</Text>
            <Text>Email: {authState?.email}</Text>
            <TouchableOpacity
                style = {styles.button}
                onPress={signOut}
            >
                <Text style = {styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button : {
        backgroundColor: "#0782F9",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontWeight: 700,
        fontSize: 16
    },
})