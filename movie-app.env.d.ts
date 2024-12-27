
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type AuthStackParamsList = {
    login: undefined;
    register: undefined;
}

export type CartStackParamsList = {
    cart: undefined;
    order: undefined;
}

export type AppTabParamsList = {
    home: undefined;
    cartStack: undefined;
    profile: undefined;
}

export type AuthStackScreenProps<T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>
export type CartStackScreenProps<T extends keyof CartStackParamsList> = StackScreenProps<CartStackParamsList, T>
export type AppTabScreenProps<T extends keyof AppTabParamsList> = BottomTabScreenProps<AppTabParamsList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackParamsList, CartStackParamsList, AppTabParamsList {}
    }
}
