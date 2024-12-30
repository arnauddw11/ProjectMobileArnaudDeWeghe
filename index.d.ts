interface Movie {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres: { id: number; name: string }[];
}  