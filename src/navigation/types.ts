
import { StackScreenProps } from "@react-navigation/stack";

export type MovieStackParamsList = {
    HomeScreen: undefined
    MovieDetails: {movie: {id: number, title: string, poster_path: string, overview: string, release_date: string, vote_average: number, genre_ids: number[]}}
}

export type MovieDetailScreenProps<T extends keyof MovieStackParamsList> = StackScreenProps<MovieStackParamsList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MovieStackParamsList {}
    }
}


