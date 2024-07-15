import React from "react";
import { createStackNavigator, createSwitchNavigator, createAppContainer} from "@react-navigation/stack";


import InitialPage from '../initial-login-screens/InitialPage'
import UserLogin from '../initial-login-screens/UserLogin'
import AdminLogin from '../initial-login-screens/AdminLogin'

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
