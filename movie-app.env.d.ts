
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type AuthStackParamsList = {
    login: undefined;
    register: undefined;
}

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
};

export type MovieStackParamsList = {
    HomeScreen: undefined;
    MovieDetails:  {movie: Movie};
}


export type AuthStackScreenProps<T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>
export type MovieStackParamsList<T extends keyof MovieStackParamsList> = StackScreenProps<MovieStackParamsList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackParamsList, MovieStackParamsList {}
    }
}
