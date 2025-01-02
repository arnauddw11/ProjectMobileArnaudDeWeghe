import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal, Button } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { addFavorite, removeFavorite} from "../store/favorites/slice";
import { addTicket, removeTicket } from "../store/tickets/slice";
import { MovieDetailScreenProps } from "../navigation/types";
import { auth } from "../config/firebase";
import { useGenres } from "../hooks/useMovies";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import biosGentData from '../json/bios_gent.json';
import { useState, useEffect } from "react";

interface Cinema {
    naam: string;
    ligging: string;
    geo_point_2d: {
        lon: number;
        lat: number;
    };
}

const MovieDetails = () => {
    const {
        params: { movie },
    } = useRoute<MovieDetailScreenProps<"MovieDetails">["route"]>();
    const { data: genreData } = useGenres();

    const navigation = useNavigation<MovieDetailScreenProps<"MovieDetails">["navigation"]>();

    const dispatch = useAppDispatch();
    const favoritesState = useAppSelector((state) => state.favorites);
    const ticketState = useAppSelector((state) => state.tickets);


    const isFavorite = favoritesState.some((favMovie) => favMovie.title === movie.title);
    const user = auth.currentUser;

    const isInCart = ticketState.some((savedToCart) =>
    savedToCart.movie.title === movie.title && savedToCart.cinema.naam === selectedCinema?.naam
);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

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
        } else {
            dispatch(addFavorite(movie));
        }
    };
    const handleAddToCart = () => {
        if (!user) {
            Alert.alert(
                "Please log in",
                "You need to be logged in to add items to your cart. Please log in to continue.",
                [
                    { text: "Log In" },
                    { text: "Cancel", style: "cancel" },
                ]
            );
            return;
        }

        setModalVisible(true);
    };

    const handleCinemaSelect = (cinema: Cinema) => {
        setSelectedCinema(cinema);
        setModalVisible(false);
        dispatch(addTicket({ movie, cinema }));
        //handleConfirmAddToCart();
    };

    useEffect(() => {
        if (selectedCinema) {
            handleConfirmAddToCart();
        }
    }, [selectedCinema]);

    const handleConfirmAddToCart = async () => {
        if (!user) {
            Alert.alert(
                "Please log in",
                "You need to be logged in to add items to your cart. Please log in to continue.",
                [
                    { text: "Log In" }, 
                    { text: "Cancel", style: "cancel" },
                ]
            );
            return;
        }
    
        if (!selectedCinema) {
            Alert.alert("Error", "Please select a cinema.");
            return;
        }
    
        try {
            const userDocRef = doc(db, "users", user.uid);
            const docSnapshot = await getDoc(userDocRef);
    
            const cartItem = {
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                genre_ids: movie.genre_ids,
                vote_average: movie.vote_average,
                cinema: selectedCinema,  
            };
    
            if (docSnapshot.exists()) {
                await updateDoc(userDocRef, {
                    cartItems: arrayUnion(cartItem),
                });
            } else {
                await setDoc(userDocRef, {
                    cartItems: [cartItem],
                });
            }
    
            Alert.alert("Added to Cart", `"${movie.title}" has been added to your shopping cart.`);
        } catch (error) {
            console.error("Error adding to cart: ", error);
            Alert.alert("Error", "There was an issue adding the movie to your cart.");
        }
    };
    


    const releaseDate = new Date(movie.release_date).toLocaleDateString();

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

-                <Text style={styles.details}>Release Date: {releaseDate}</Text>

                <Text style={styles.details}>Rating: {movie.vote_average}/10</Text>

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
                <TouchableOpacity
                    onPress={handleAddToCart}
                >
                    <IconButton
                        icon={"cart-plus"}
                        size={24}
                        style={{ backgroundColor: "#555" }}
                    />
                    <Text style={styles.favoriteText}>{"Add to Shopping Cart"}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select a Cinema</Text>
                            {biosGentData.map((cinema) => (
                                <TouchableOpacity
                                    key={cinema.naam}
                                    style={styles.modalOption}
                                    onPress={() => handleCinemaSelect(cinema)}
                                >
                                    <Text style={styles.modalOptionText}>{cinema.naam}</Text>
                                </TouchableOpacity>
                            ))}
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 16,
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    modalOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        marginBottom: 8,
    },
    modalOptionText: {
        fontSize: 16,
    },
});

export default MovieDetails;
