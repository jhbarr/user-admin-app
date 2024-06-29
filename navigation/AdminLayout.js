import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdminLogin from "../Initial-Login-Screens/AdminLogin";
import AdminHome from "../admin-screens/AdminHome";

const Stack = createStackNavigator()

export default function AdminLayout() {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {/* <Stack.Screen name='Admin Login Page' component={AdminLogin}/> */}
                <Stack.Screen name='Admin Home Page' component={AdminHome} />
            </Stack.Navigator>
    )
}