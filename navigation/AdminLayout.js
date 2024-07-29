import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../admin-screens/HomeScreen";
import AddScreen from "../admin-screens/AddScreen";
import ConfirmScreen from "../admin-screens/ConfirmScreen";
import ScannerScreen from "../admin-screens/ScannerScreen";

const Stack = createStackNavigator()

export default function AdminLayout() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Scanner' component={ScannerScreen}/>
            <Stack.Screen name='Add' component={AddScreen}/>
            <Stack.Screen name='Confirm' component={ConfirmScreen}/>
            <Stack.Screen name="Use" component={FreePopsiclesScreen}/>
        </Stack.Navigator>
    )
}