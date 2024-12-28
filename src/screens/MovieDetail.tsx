import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { addFavorite, removeFavorite } from "../store/favorites/slice";
import { MovieDetailScreenProps } from "../navigation/types";

const MovieDetails = () => {
    const {
        params: { movie },
    } = useRoute<MovieDetailScreenProps<"MovieDetail">["route"]>();

    const navigation =
        useNavigation<MovieDetailScreenProps<"MovieDetail">["navigation"]>();

    const dispatch = useAppDispatch();
    const favoritesState = useAppSelector((state) => state.favorites);

    // Check if the movie is already in the favorites list
    const isFavorite = favoritesState.some((favMovie) => favMovie.title === movie.title);

    const handleFavoritePress = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movie.title)); // Remove from favorites
            console.log(`Removed "${movie.title}" from favorites.`);
        } else {
            dispatch(addFavorite(movie)); // Add to favorites
            console.log(`Added "${movie.title}" to favorites.`);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.poster}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>

            {/* Favorite Button */}
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                <IconButton
                    icon={isFavorite ? "star" : "star-outline"} // Dynamic icon
                    size={24}
                    background={isFavorite ? "#FFD700" : "#555"} // Highlighted color if favorite
                />
                <Text style={styles.favoriteButtonText}>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    poster: {
        width: 200,
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    overview: {
        fontSize: 16,
        color: "#555",
        textAlign: "justify",
        marginBottom: 16,
    },
    favoriteButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        marginTop: 16,
    },
    favoriteButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default MovieDetails;
