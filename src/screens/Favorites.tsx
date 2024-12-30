import React, { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { useAppSelector, useAppDispatch } from "../store";
import { removeFavorite, clearFavorites } from "../store/favorites/slice";
import FavoriteItem from "../components/FavoriteItem"; 
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Favorites = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites);
    const user = auth.currentUser;

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
        <View className="flex-1 bg-gray-50 p-4">
            <View className="mb-6">
                <Text className="text-3xl font-bold text-gray-800 text-center">Your Favorites</Text>
            </View>

            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <FavoriteItem movie={item} onRemove={handleRemoveFavorite} />
                    )}
                    contentContainerStyle={{ paddingBottom: 12 }}
                />
            ) : (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-lg text-gray-500 text-center mt-5">
                        {user
                            ? "You haven't added any favorites yet!"
                            : "Please log in to see your favorites."}
                    </Text>
                    {!user && (
                        <Text className="text-sm text-gray-400 text-center mt-2">
                            Log in to browse and add your favorite movies.
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default Favorites;
