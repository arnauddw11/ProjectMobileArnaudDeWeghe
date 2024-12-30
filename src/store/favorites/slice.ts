import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Movie[] = [];

const favoritesSlice = createSlice({
    initialState: initialState,
    name: "favorites",
    reducers: {
        addFavorite: (currentState, action: PayloadAction<Movie>) => {
            return [...currentState, action.payload];
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            return state.filter((p) => p.title !== action.payload);
        },
        clearFavorites: () => {
            return []; 
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
