import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { addFavorite, removeFavorite } from "../store/favorites/slice";
import { MovieDetailScreenProps } from "../navigation/types";
import { auth } from "../config/firebase";
import { useGenres } from "../hooks/useMovies"; // Use both hooks


const MovieDetails = () => {
    const {
        params: { movie },
    } = useRoute<MovieDetailScreenProps<"MovieDetails">["route"]>();
    const { data: genreData } = useGenres();

    const navigation = useNavigation<MovieDetailScreenProps<"MovieDetails">["navigation"]>();

    const dispatch = useAppDispatch();
    const favoritesState = useAppSelector((state) => state.favorites);

    const isFavorite = favoritesState.some((favMovie) => favMovie.title === movie.title);
    const user = auth.currentUser;

    // Handle add/remove favorites
    const handleFavoritePress = () => {
        if (!user) {
            Alert.alert(
                "Please log in",
                "You need to be logged in to add favorites. Please log in to continue.",
                [
                    {
                        text: "Log In",
                        onPress: () => {
                            // Navigate to login screen if needed
                            //navigation.navigate("login");
                        },
                    },
                    { text: "Cancel", style: "cancel" },
                ]
            );
            return;
        }

        if (isFavorite) {
            dispatch(removeFavorite(movie.title));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    // Format release date
    const releaseDate = new Date(movie.release_date).toLocaleDateString();

    // Get genre names from genre_ids
    const getGenreNames = (genreIds: number[]) => {
        return genreIds
            .map((id) => genreData?.genres.find((genre) => genre.id === id)?.name)
            .filter(Boolean) as string[];
    };

    const genres = getGenreNames(movie.genre_ids);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.poster}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                    resizeMode="cover"
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>

                {/* Release Date */}
                <Text style={styles.details}>Release Date: {releaseDate}</Text>

                {/* Rating */}
                <Text style={styles.details}>Rating: {movie.vote_average}/10</Text>

                {/* Genres */}
                <Text style={styles.details}>Genres: {genres.join(", ")}</Text>

                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={handleFavoritePress}
                >
                    <IconButton
                        icon={isFavorite ? "star" : "star-outline"}
                        size={24}
                        style={{ backgroundColor: isFavorite ? "#FFD700" : "#555" }}
                    />
                    <Text style={styles.favoriteText}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 16, // Ensures there's padding at the bottom when scrolling
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
    },
    poster: {
        width: 192,
        height: 288,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    overview: {
        fontSize: 16,
        color: "#555",
        textAlign: "justify",
        marginBottom: 16,
    },
    details: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    favoriteButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        marginTop: 16,
    },
    favoriteText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default MovieDetails;
