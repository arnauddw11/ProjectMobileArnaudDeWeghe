import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useMovies } from "../hooks/useMovies";
import MovieComponent from "../components/MovieComponent";

const HomeScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useMovies();

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
      <FlatList
        data={data?.results} // Array of movies
        keyExtractor={(item) => item.id.toString()} // Unique key for each movie
        renderItem={({ item }) => (
          <MovieComponent
            title={item.title}
            overview={item.overview}
            posterPath={item.poster_path}
          />
        )}
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
});

export default HomeScreen;
