import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

interface FavoriteItemProps {
    movie: Movie; 
    onRemove: (title: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ movie, onRemove }) => {
    return (
        <View className="flex-row items-center mb-4 bg-gray-100 p-2 rounded-lg shadow">
            <Image
                className="w-16 h-24 rounded-md mr-3"
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
            />
            <View className="flex-1 justify-center">
                <Text className="text-lg font-bold text-gray-800 mb-1">{movie.title}</Text>
                <TouchableOpacity
                    onPress={() => onRemove(movie.title)}
                    className="flex-row items-center mt-1"
                >
                    <IconButton icon="delete" size={20} background="#ff4444" />
                    <Text className="text-sm font-medium text-red-500 ml-1">Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FavoriteItem;
