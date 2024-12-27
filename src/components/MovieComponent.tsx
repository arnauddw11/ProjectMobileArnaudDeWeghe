import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// Define the props interface
interface MovieComponentProps {
  title: string | undefined; // Allow undefined to handle potential issues
  overview: string | undefined;
  posterPath: string | undefined;
  navigateToDetails: () => void; // Ensure this is included
}

// Use the props in the component
const MovieComponent: React.FC<MovieComponentProps> = ({ title, overview, posterPath, navigateToDetails }) => {
  // Use the 'original' size for the poster image URL
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : "";

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToDetails}>
      {posterPath ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, { backgroundColor: "#ccc" }]} /> // Placeholder if no image
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title || "Untitled Movie"}</Text> {/* Fallback title */}
        <Text style={styles.overview}>{overview || "No description available."}</Text> {/* Fallback overview */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
});

export default MovieComponent;
