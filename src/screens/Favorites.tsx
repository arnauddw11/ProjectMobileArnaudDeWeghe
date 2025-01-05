import React, { useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "../store";
import { removeFavorite, clearFavorites } from "../store/favorites/slice";
import FavoriteItem from "../components/FavoriteItem"; 
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const Favorites = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites);
    const user = auth.currentUser;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                dispatch(clearFavorites());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    const handleRemoveFavorite = (title: string) => {
        dispatch(removeFavorite(title));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Favorites</Text>
            </View>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <FavoriteItem movie={item} onRemove={handleRemoveFavorite} />
                    )}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    {user ? (
                        <Text>You haven't added any favorites yet!</Text>
                    ) : (
                        <Text>Please log in to see your favorites.</Text>
                    )
                    }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB", 
        padding: 16,
    },
    header: {
        marginBottom: 24,
        alignItems: "center",
    },
    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#4B5563", 
        textAlign: "center",
    },
    flatListContent: {
        paddingBottom: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Favorites;
