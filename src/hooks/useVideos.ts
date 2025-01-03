import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

type VideosResponse = {
    id: number;
    results: Video[];
};

const fetchVideos = async (movieId: number): Promise<VideosResponse> => {
    const bearer = process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN as string; 

    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${bearer}`,
        },
    };

    const response = await axios.request<VideosResponse>(options);
    return response.data;
};

export const useVideos = (movieId: number) => {
    return useQuery<VideosResponse, Error>({
        queryKey: ["videos", movieId], 
        queryFn: () => fetchVideos(movieId), 
        enabled: !!movieId,
        refetchInterval: 5 * 60 * 1000, 
    });
};
