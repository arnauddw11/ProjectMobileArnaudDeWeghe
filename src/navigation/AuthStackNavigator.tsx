import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { AuthStackParamsList } from "../../movie-app.env";

const AuthStack = createStackNavigator<AuthStackParamsList>();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="login" component={Login} />
            <AuthStack.Screen name="register" component={Register} />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;