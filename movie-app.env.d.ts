
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type AuthStackParamsList = {
    login: undefined;
    register: undefined;
}

export type MovieStackParamsList = {
    home: undefined;
    movie: undefined;
}


export type AuthStackScreenProps<T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>
export type MovieStackParamsList<T extends keyof MovieStackParamsList> = StackScreenProps<MovieStackParamsList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackParamsList, MovieStackParamsList {}
    }
}
