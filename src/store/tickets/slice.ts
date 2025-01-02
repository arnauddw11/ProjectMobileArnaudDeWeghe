import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Ticket[] = [];

const ticketsSlice = createSlice({
    initialState: initialState,
    name: "tickets",
    reducers: {
        addTicket: (currentState, action: PayloadAction<Ticket>) => {
            return [...currentState, action.payload];
        },
        removeTicket: (state, action: PayloadAction<string>) => {
            return state.filter((ticket) => ticket.movie.title !== action.payload);
        },
        clearTickets: () => {
            return []; 
        },
    },
});

export const { addTicket, removeTicket, clearTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
