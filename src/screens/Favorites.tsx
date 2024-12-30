import React from "react";
import { Text, View, FlatList } from "react-native";
import { useAppSelector, useAppDispatch } from "../store";
import { removeFavorite } from "../store/favorites/slice";
import FavoriteItem from "../components/FavoriteItem"; // Adjust path based on your structure

const Favorites = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites);

    const handleRemoveFavorite = (title: string) => {
        dispatch(removeFavorite(title));
    };

    return (
        <View className="flex-1 bg-gray-50 p-4">
            {/* Header Section */}
            <View className="mb-6">
                <Text className="text-3xl font-bold text-gray-800 text-center">Your Favorites</Text>
            </View>

            {/* Favorites List or Empty State */}
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
                        You haven't added any favorites yet!
                    </Text>
                    <Text className="text-sm text-gray-400 text-center mt-2">
                        Browse and add your favorite movies to this list.
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Favorites;
