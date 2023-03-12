import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const id = action.payload;
            if (!state.items.some((wishlistItem) => wishlistItem.id === id)) {
                state.items.push({ id: id });
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(
                (wishlistItem) => wishlistItem.id !== id
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
