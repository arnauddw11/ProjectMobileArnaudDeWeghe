import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { addFavorite, removeFavorite } from "../store/favorites/slice";
import { MovieDetailScreenProps } from "../navigation/types";
import { auth } from '../config/firebase';

const MovieDetails = () => {
    const {
        params: { movie },
    } = useRoute<MovieDetailScreenProps<"MovieDetail">["route"]>();

    const navigation = useNavigation<MovieDetailScreenProps<"MovieDetail">["navigation"]>();

    const dispatch = useAppDispatch();
    const favoritesState = useAppSelector((state) => state.favorites);

    const isFavorite = favoritesState.some((favMovie) => favMovie.title === movie.title);

    const user = auth.currentUser;

    const handleFavoritePress = () => {
        if (!user) {
            Alert.alert(
                "Please log in",
                "You need to be logged in to add favorites. Please log in to continue.",
                [
                    {
                        text: "Log In",
                    },
                    { text: "Cancel", style: "cancel" },
                ]
            );
            return;
        }

        if (isFavorite) {
            dispatch(removeFavorite(movie.title)); 
            console.log(`Removed "${movie.title}" from favorites.`);
        } else {
            dispatch(addFavorite(movie));
            console.log(`Added "${movie.title}" to favorites.`);
        }
    };

    return (
        <View className="flex-1 p-4 items-center bg-white">
            <Image
                style={{ width: 192, height: 288, borderRadius: 8 }} // Direct style applied
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-center mb-4">{movie.title}</Text>
            <Text className="text-base text-gray-600 text-justify mb-4">{movie.overview}</Text>

            <TouchableOpacity 
                className="flex-row items-center p-2 bg-gray-200 rounded-lg mt-4"
                onPress={handleFavoritePress}
            >
                <IconButton
                    icon={isFavorite ? "star" : "star-outline"} 
                    size={24}
                    background={isFavorite ? "#FFD700" : "#555"} 
                />
                <Text className="ml-2 text-lg font-bold text-gray-800">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default MovieDetails;
