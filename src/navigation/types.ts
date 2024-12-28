
// Importeren van uw NavigatorProps -> StackNavigator/TabNavigator/DrawerNavigator

import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer"; 

export type MovieStackParamsList = {
    HomeScreen: undefined
    MovieDetail: {movie: {title: string, poster_path: string, overview: string }}
}

export type MovieDetailScreenProps<T extends keyof MovieStackParamsList> = StackScreenProps<MovieStackParamsList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MovieStackParamsList {}
    }
}


