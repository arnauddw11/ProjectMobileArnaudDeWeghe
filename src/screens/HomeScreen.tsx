import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { useMovies, useGenres } from "../hooks/useMovies"; // Use both hooks
import MovieComponent from "../components/MovieComponent";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const { data: movieData, isLoading, isError, error } = useMovies();
  const { data: genreData } = useGenres();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to get genre names from genre IDs
  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genreData?.genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean) as string[];
  };

  // Function to handle vote range filtering
  const isVoteInRange = (voteAverage: number, query: string) => {
    const searchNum = parseFloat(query);
    if (isNaN(searchNum) || searchNum < 0 || searchNum > 10) return false;
    const lowerBound = Math.floor(searchNum); // Round down to the nearest integer (e.g., 8 => 8.0)
    const upperBound = lowerBound + 0.9; // Set the upper bound (e.g., 8.0 to 8.9)
    return voteAverage >= lowerBound && voteAverage <= upperBound;
  };

  // Filter movies based on search query
  const filteredMovies = movieData?.results.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const genreNames = getGenreNames(movie.genre_ids);
    const genreMatch = genreNames.some((genre) =>
      genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const ratingMatch = isVoteInRange(movie.vote_average, searchQuery);

    return titleMatch || genreMatch || ratingMatch;
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error fetching movies: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welkom bij Ciné Gent!</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies by title, genre, or rating..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieComponent
            title={item.title}
            overview={item.overview}
            posterPath={item.poster_path}
            releaseYear={item.release_date}
            genre_ids={item.genre_ids}
            vote_average={item.vote_average}
            navigateToDetails={() =>
              navigation.navigate("movie", { movie: item })
            }
          />
        )}
        ListEmptyComponent={<Text>No movies found matching your search.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default HomeScreen;
