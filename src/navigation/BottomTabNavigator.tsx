import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ShoppingCart from "../screens/ShoppingCart";
import Favorites from "../screens/Favorites";
import Map from "../screens/Map";
import AccountScreen from "../screens/Account";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "../navigation/AuthStackNavigator";
import MovieStackNavigator from "./MovieStackNavigator";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PurchasedTickets from "../screens/PurchasedTickets";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={MovieStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home-filled" size={40} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="shopping-cart" size={40} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Tickets"
                component={PurchasedTickets}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="ticket" size={40} color="black" />),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="star-outline" size={40} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="map" size={40} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={user ? AccountScreen : AuthNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="account-circle" size={40} color="black" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
