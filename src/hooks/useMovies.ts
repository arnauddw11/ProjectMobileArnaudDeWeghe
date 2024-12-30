import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string; 
  vote_average: number;
};

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};
type GenresResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};
const fetchMovies = async (): Promise<MoviesResponse> => {
  const bearer = process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN as string; // Type assertion for the environment variable

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };

  const response = await axios.request<MoviesResponse>(options);
  return response.data;
};

const fetchGenres = async (): Promise<GenresResponse> => {
  const bearer = process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN as string; 

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  };

  const response = await axios.request<GenresResponse>(options);
  return response.data;
};

export const useMovies = () => {
  return useQuery<MoviesResponse, Error>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    refetchInterval: 5 * 60 * 1000, // Optional: Poll every 5 minutes
  });
};

export const useGenres = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    refetchInterval: 5 * 60 * 1000, // Optional: Poll every 5 minutes
  });
};
