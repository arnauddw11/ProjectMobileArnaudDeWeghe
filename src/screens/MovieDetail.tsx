import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { MovieDetailScreenProps } from "../navigation/types";

const MovieDetails = ({  }) => {
    const {
        params: { movie },
    } = useRoute<MovieDetailScreenProps<"MovieDetail">["route"]>();
    
    const navigation =
        useNavigation<MovieDetailScreenProps<"MovieDetail">["navigation"]>();

    return (
        <View style={styles.container}>
            <Image
                style={styles.poster}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
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
    },
});

export default MovieDetails;
