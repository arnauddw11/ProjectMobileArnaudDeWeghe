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
        <View className="flex-1 bg-white p-4">
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <FavoriteItem movie={item} onRemove={handleRemoveFavorite} />
                    )}
                    contentContainerStyle={{ paddingVertical: 8 }}
                />
            ) : (
                <Text className="text-lg text-gray-500 text-center mt-5">
                    No favorites added yet!
                </Text>
            )}
        </View>
    );
};

export default Favorites;
