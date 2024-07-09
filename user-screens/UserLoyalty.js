import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import QRCode from "react-native-qrcode-svg";
import { io } from "socket.io-client";

export default function UserLoyalty({ navigation }) {
    const { authState } = useAuth()
    const [stamps, setStamps] = useState(null)

    function onError() {
        console.log("There was an error with the QR code")
    }

    // Function that is run when the user connects to the web socket
    const sendConnect = async () => {
        const api_response = await fetch('http://127.0.0.1:5000/get-stamps', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: authState?.id,
            }),
      })
    
        const json = await api_response.json()
        setStamps(json.stamps)
    
        socket.emit("start-thread", {"userID": authState?.id})
      }

    // Open and connect to a Socket IO web socket
    useEffect(() => {

        // create websocket/connect
        socket = io("http://127.0.0.1:5000/", {
          transports: ["websocket"],
          cors: {
            origin: "http://127.0.0.1:3000/",
          },
        })
    
        socket.on("connect", () => sendConnect())

        socket.on("stamp", (data) => {
            setStamps(data.stamps)
          })
        
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    return (
        <View style = {styles.view}>
            <QRCode 
                value={authState?.id === null ? 0 : authState?.id} 
                size={200} 
                color="black"
                backgroundColor="white"
                onError={onError}
            /> 
            <Text style={styles.text}>ID: {authState?.id}</Text>
            <Text style={styles.text}>Stamps: {stamps}</Text>
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