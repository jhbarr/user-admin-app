import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()

export default function AdminLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            
        </Tab.Navigator>
    )
}