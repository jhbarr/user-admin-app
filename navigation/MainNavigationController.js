import React, { useEffect } from "react";
import { createStackNavigator} from "@react-navigation/stack";
import { useAuth, Role } from "../context/AuthContext";
import { auth } from "../FireBaseConfig";

import InitialLoginLayout from "./InitialLoginLayout";
import AdminLayout from "./AdminLayout";
import UserLayout from './UserLayout'

const Stack = createStackNavigator()

export default function MainNavigationController() {
    const { authState, setAuthState } = useAuth()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthState({
                    authenticated: true,
                    email: user.email,
                    id: user.uid,
                    role: 'user',
                })
            }
            else {
                setAuthState({
                    authenticated: null,
                    email: null,
                    id: null,
                    role: null,
                })
            }
        })
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {authState.authenticated === null && <Stack.Screen name='Initial Route' component={InitialLoginLayout} />}
            {authState?.authenticated === true && authState.role === Role.ADMIN && <Stack.Screen name='Admin Side' component={AdminLayout} />}
            {authState?.authenticated === true && authState.role === Role.USER && <Stack.Screen name='User Side' component={UserLayout} />}
        </Stack.Navigator>
    )
}
