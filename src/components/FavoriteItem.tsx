import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface FavoriteItemProps {
    movie: Movie; 
    onRemove: (title: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ movie, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.poster}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <Text className="text-xl font-bold text-gray-800 mb-2">{movie.title}</Text>
                <TouchableOpacity
                    onPress={() => onRemove(movie.title)}
                    className="flex-row items-center"
                >
                    <IconButton icon="delete" size={22} style={{ backgroundColor: "#ff4444" }} />
                    <Text className="text-sm font-medium text-red-500 ml-2">Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#f3f4f6", 
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
});

export default FavoriteItem;
