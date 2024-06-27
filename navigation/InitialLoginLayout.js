import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserLogin from '../Initial-Login-Screens/UserLogin'
import AdminLogin from '../Initial-Login-Screens/AdminLogin';
import InitialPage from '../Initial-Login-Screens/InitialPage'

import { AuthProvider } from "../context/AuthContext";

const Stack = createStackNavigator()

export default function InitialLoginLayout() {
    return (
        <AuthProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Initial Page' component={InitialPage}/>
                <Stack.Screen name='User Login' component={UserLogin}/>
                <Stack.Screen name='Admin Login' component={AdminLogin}/>
            </Stack.Navigator>
        </AuthProvider>
    )
}