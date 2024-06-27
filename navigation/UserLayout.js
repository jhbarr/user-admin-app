import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserLogin from "../Initial-Login-Screens/UserLogin";
import UserHome from '../user-screens/UserHome'

const Stack = createStackNavigator()

export default function InitialLoginLayout() {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='User Login Page' component={UserLogin}/>
                <Stack.Screen name='User Home Page' component={UserHome} />
            </Stack.Navigator>
    )
}