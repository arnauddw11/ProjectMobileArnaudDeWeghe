import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MovieStackParamsList } from "../../movie-app.env";
import HomeScreen from "../screens/HomeScreen";
import MovieDetails from "../screens/MovieDetail";

const MovieStack = createStackNavigator<MovieStackParamsList>();

const MovieStackNavigator = () => {
    return (
        <MovieStack.Navigator screenOptions={{ headerShown: false }}>
            <MovieStack.Screen name="HomeScreen" component={HomeScreen} />
            <MovieStack.Screen name="MovieDetails" component={MovieDetails} />
        </MovieStack.Navigator>
    );
};

export default MovieStackNavigator;