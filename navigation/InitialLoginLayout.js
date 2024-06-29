import React from "react";
import { createStackNavigator, createSwitchNavigator, createAppContainer} from "@react-navigation/stack";


import InitialPage from '../Initial-Login-Screens/InitialPage'
import UserLogin from '../Initial-Login-Screens/UserLogin'
import AdminLogin from '../Initial-Login-Screens/AdminLogin'

const Stack = createStackNavigator()

export default function InitialLoginLayout() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Initial Page' component={InitialPage}/>
            <Stack.Screen name='User Login' component={UserLogin} />
            <Stack.Screen name='Admin Login' component={AdminLogin} />
        </Stack.Navigator>
    )
}
