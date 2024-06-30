import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserHome from '../user-screens/UserHome'
import UserLoyalty from '../user-screens/UserLoyalty'

const Tab = createBottomTabNavigator()

export default function UserLayout() {
    return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen name='User Home Page' component={UserHome} />
                <Tab.Screen name='User Info Page' component={UserLoyalty} />
            </Tab.Navigator>
    )
}