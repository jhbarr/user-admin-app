import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminHome from "../admin-screens/AdminHome";

const Tab = createBottomTabNavigator()

export default function AdminLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
           <Tab.Screen name='Admin Home Page' component={AdminHome} />
        </Tab.Navigator>
    )
}