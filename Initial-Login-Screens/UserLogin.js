import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Role, useAuth, useIsMount } from "../context/AuthContext";

import { auth } from "../FireBaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";



export default function UserLogin({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { onLogin, onSignup, authState } = useAuth()
    const isMount = useIsMount()

    const onSignIn = async () => {
        onLogin(email, password, Role.USER)
    }

    const onRegister = async () => {
        onSignup(email, password, Role.USER)
    }

    useEffect(() => {
        if (authState?.authenticated && authState?.role === Role.USER) {
            console.log(authState)
            navigation.replace('User Side');
        }
        else if (!isMount) {
            alert("Invalid login credentials")
        }
    }, [authState])


    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding"
        >
            <Text>User login page</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder = "Email"
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style = {styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder = "Password"
                    value = {password}
                    onChangeText={text => setPassword(text)}
                    style = {styles.input}
                    // secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress={onSignIn}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onRegister}
                    style = {[styles.button, styles.buttonOutline]}
                >
                    <Text style = {styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%",

    },
    input: {
        color: "black",
        backgroundColor: "#d3d3d3",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        alignItems: "center",
        marginTop: 40,
    },
    button : {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: 700,
        fontSize: 16
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: 700,
        fontSize: 16
    },
})

