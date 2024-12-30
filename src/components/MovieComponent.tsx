import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import { useGenres } from "../hooks/useMovies";

// Define the props interface
interface MovieComponentProps {
  title: string | undefined; // Allow undefined to handle potential issues
  overview: string | undefined;
  poster_path: string | undefined;
  release_date: string; 
  genre_ids: number[];
  vote_average: number;
  navigateToDetails: () => void; // Ensure this is included
}

const MovieComponent: React.FC<MovieComponentProps> = ({
  title,
  overview,
  poster_path,
  release_date,
  genre_ids,
  vote_average,
  navigateToDetails,
}) => {
  const { data, isLoading, isError, error } = useGenres();

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : "";

  const genreNames = genre_ids
    .map((id) => data?.genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToDetails}>
      {poster_path ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, { backgroundColor: "#ccc" }]} /> // Placeholder if no image
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title || "Untitled Movie"}</Text> {/* Fallback title */}
        <Text style={styles.releaseYear}>{release_date || "xxxx"}</Text> {/* Show release year */}
        <Text style={styles.genres}>{genreNames.join(", ") || "No genres available"}</Text>
        <Text style={styles.overview}>{overview || "No description available."}</Text> {/* Fallback overview */}
        
        {/* Add the filled star icon next to the vote average */}
        <View style={styles.voteContainer}>
          <MaterialIcons 
            name="star" // Filled star
            size={18} 
            color="#FFD700" // Yellow color
            style={styles.starIcon} 
          />
          <Text>{vote_average ? vote_average.toFixed(1) : "No rating available"}</Text>
        </View>
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
  releaseYear: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  genres: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  starIcon: {
    marginRight: 4,
  },
});

export default MovieComponent;
