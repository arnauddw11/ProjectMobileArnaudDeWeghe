import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

interface FavoriteItemProps {
    movie: Movie; 
    onRemove: (title: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ movie, onRemove }) => {
    return (
        <View className="flex-row items-center mb-4 bg-gray-100 p-4 rounded-lg shadow">
            {/* Image */}
            <Image
                style={{ width: 120, height: 180, borderRadius: 8, marginRight: 16 }}  // Bigger image
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                resizeMode="cover"
            />
            {/* Title and Remove Button */}
            <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 mb-2">{movie.title}</Text> {/* Larger title */}
                <TouchableOpacity
                    onPress={() => onRemove(movie.title)}
                    className="flex-row items-center"
                >
                    <IconButton icon="delete" size={22} background="#ff4444" /> {/* Bigger icon */}
                    <Text className="text-sm font-medium text-red-500 ml-2">Remove</Text> {/* Spacing for text */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FavoriteItem;
