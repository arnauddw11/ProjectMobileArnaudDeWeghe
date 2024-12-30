import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useGenres } from "../hooks/useMovies";

interface MovieComponentProps {
  title: string | undefined; 
  overview: string | undefined;
  poster_path: string | undefined;
  release_date: string; 
  genre_ids: number[];
  vote_average: number;
  navigateToDetails: () => void;
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
  const { data } = useGenres();

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : "";

  const genreNames = genre_ids
    .map((id) => data?.genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToDetails}>
      {poster_path ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, { backgroundColor: "#ccc" }]} /> 
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title || "Untitled Movie"}</Text> 
        <Text style={styles.releaseYear}>{release_date || "xxxx"}</Text> 
        <Text style={styles.genres}>{genreNames.join(", ") || "No genres available"}</Text>
        <Text style={styles.overview}>{overview || "No description available."}</Text>
        
        <View style={styles.voteContainer}>
          <MaterialIcons 
            name="star" 
            size={18} 
            color="#FFD700" 
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
