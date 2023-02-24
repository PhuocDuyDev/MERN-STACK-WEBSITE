import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [{id: 4}, {id: 5}, {id: 16}],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;
            if (!state.items.includes(item)) {
                state.items.push(item);
            }
        },
        removeFromWishlist: (state, action) => {
            const item = action.payload;
            state.items = state.items.filter(
                (wishlistItem) => wishlistItem !== item
            );
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
    wishlistSlice.actions;

export default wishlistSlice.reducer;
