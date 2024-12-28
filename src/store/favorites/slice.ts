import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Movie[] = [];

// Dit is eigenlijk om een rek in ons magazijn aan te maken -> Nieuwe slice voor onze store met de reducers
const favoritesSlice = createSlice({
    initialState: initialState,
    name: "favorites",
    reducers: {
        // Add ACTION -> Functie is eigenlijk een reducer
        addFavorite: (currentState, action: PayloadAction<Movie>) => {
            return [...currentState, action.payload];
        },
        // Remove ACTION
        removeFavorite: (state, action: PayloadAction<string>) => {
            return state.filter(p => p.title !== action.payload)
        }
    }
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;