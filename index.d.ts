interface Movie {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
}  

interface Cinema {
    naam: string;
    ligging: string;
    geo_point_2d: {
        lon: number;
        lat: number;
    };
}

interface Ticket {
    movie: Movie;
    cinema: Cinema;
}