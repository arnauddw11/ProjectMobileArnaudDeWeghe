
// Importeren van uw NavigatorProps -> StackNavigator/TabNavigator/DrawerNavigator

import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer"; 

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


