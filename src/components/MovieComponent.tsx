import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Define the props interface
interface MovieComponentProps {
  title: string;
  overview: string;
  posterPath: string;
}

// Use the props in the component
const MovieComponent: React.FC<MovieComponentProps> = ({ title, overview, posterPath }) => {
  // Use the 'original' size for the poster image URL
  const imageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.overview}>{overview}</Text>
      </View>
    </View>
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
