import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  poster_path: string;
};

const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const bearer = process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN as string;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };

  const response = await axios.request<MovieDetails>(options);
  return response.data;
};

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["movieDetails", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId, // Only fetch if movieId is provided
  });
};
